import web3 from './web3';
import {
    getScholarDogeDividendTrackerContract,
    getScholarDogeTokenContract,
    getWBNBDexPairContract
} from "./contractHelpers";
import {UserDividendsInfo} from "../models/UserDividendsInfo";
import {ProjectWalletInfo} from "../models/ProjectWalletInfo";
import chains from "../config/constants/chains";
import contracts from "../config/constants/contracts";
import * as lodash from "lodash";
import {TotalRewardsInfo} from "../models/TotalRewardsInfo";
import {TokenFeaturesInfo} from "../models/TokenFeaturesInfo";
import {TokenStatsInfo} from "../models/TokenStatsInfo";
import {TokenConstraintsInfo} from "../models/TokenConstraintsInfo";
import {TokenDependenciesInfo} from "../models/TokenDependenciesInfo";

// TODO : Up here if updates
const MIN_TO_SWAP = 100000000000000000000000;
const HOUR = 3600;
const BURN_ADDR1 = '0x0000000000000000000000000000000000000000';
const BURN_ADDR2 = '0x000000000000000000000000000000000000dEaD';

const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
    : chains.mainnet.toString(), 10);

export const getUserDividendsInfo = async (account: string) => {
    const scholarDogeDividendTrackerContract = getScholarDogeDividendTrackerContract(web3);
    const info = await scholarDogeDividendTrackerContract.methods.getAccount(account).call();

    return new UserDividendsInfo(info['account'], info['iterationsUntilProcessed'],
        info['withdrawableDividends'] / 10 ** 18, info['totalDividends'] / 10 ** 18,
        info['lastClaimTime'], info['nextClaimTime'], info['secondsUntilAutoClaimAvailable']);
}

export const getProjectWalletInfo = async (account: string) => {
    const walletUserInfo = await getUserDividendsInfo(account);
    const scholarDogeTokenContract = getScholarDogeTokenContract(web3);
    const walletTokens = await scholarDogeTokenContract.methods.balanceOf(account).call() / 10 ** 9;
    const walletBNB = Number.parseInt(await web3.eth.getBalance(account)) / 10 ** 18;

    return new ProjectWalletInfo(walletTokens, walletBNB, walletUserInfo);
}

export const getTreasuryWalletInfo = async () => {
    // @ts-ignore
    return getProjectWalletInfo(contracts.treasuryWallet[chainId]);
}

export const getMarketingWalletInfo = async () => {
    // @ts-ignore
    return getProjectWalletInfo(contracts.marketingWallet[chainId]);
}

export const getFoundationWalletInfo = async () => {
    // @ts-ignore
    return getProjectWalletInfo(contracts.foundationWallet[chainId]);
}

export const getTeamTimelockWalletInfo = async () => {
    // @ts-ignore
    return getProjectWalletInfo(contracts.teamTimelock[chainId]);
}

export const getEstimatedRewards = async (account: string, seconds: number = 3600) => {
    // @ts-ignore
    const wBNBAddress = contracts.wbnb[chainId];
    const scholarDogeDividendTracker = getScholarDogeDividendTrackerContract(web3);
    const dexPair = getWBNBDexPairContract(web3);
    const tokenBalance = await scholarDogeDividendTracker.methods.balanceOf(account).call();
    const rewardShare = tokenBalance / await scholarDogeDividendTracker.methods.totalSupply().call();
    const reserves = await dexPair.methods.getReserves().call();
    const token0 = await dexPair.methods.token0().call();
    const reserveWBNB = (token0 === wBNBAddress) ? reserves['reserve0'] : reserves['reserve1'];
    const reserveSDOGE = (reserveWBNB === reserves['reserve0']) ? reserves['reserve1'] : reserves['reserve0'];

    return lodash.round(MIN_TO_SWAP * reserveWBNB / reserveSDOGE * rewardShare * seconds / HOUR) / 10 ** 18 / 10 ** 9;
}

export const getTotalRewards = async () => {
    const scholarDogeDividendTracker = getScholarDogeDividendTrackerContract(web3);
    const holders = await scholarDogeDividendTracker.methods.getNumberOfTokenHolders().call();
    const rewards = await scholarDogeDividendTracker.methods.totalDividendsDistributed().call() / 10 ** 18;

    return new TotalRewardsInfo(holders, rewards);
}

export const getTokenFeatures = async () => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const feeStruct = await scholarDogeToken.methods.feeStruct().call();
    const rewardStruct = await scholarDogeToken.methods.rewardStruct().call();

    return new TokenFeaturesInfo(feeStruct['rewardFee'], rewardStruct['rewardsOn'], feeStruct['lpFee'],
        rewardStruct['swapAndLiquifyOn'], feeStruct['treasuryFee'], feeStruct['burnFee'], rewardStruct['burnOn']);
}

export const getTokenStats = async () => {
    // @ts-ignore
    const wBNBAddress = contracts.wbnb[chainId];
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const dexPair = getWBNBDexPairContract(web3);
    const supply = await scholarDogeToken.methods.totalSupply().call() / 10 ** 9;
    const burn1 = await scholarDogeToken.methods.balanceOf(BURN_ADDR1).call() / 10 ** 9;
    const burn2 = await scholarDogeToken.methods.balanceOf(BURN_ADDR2).call() / 10 ** 9;
    const burned = burn1 + burn2;
    // @ts-ignore
    const lpAmount = await dexPair.methods.balanceOf(contracts.scholarDogeToken[chainId]).call();
    const lpTotal = await dexPair.methods.totalSupply().call();
    const lpShare = lpAmount / lpTotal * 100;
    const token0 = await dexPair.methods.token0().call();
    const reserves = await dexPair.methods.getReserves().call();
    const reserveWBNB = (token0 === wBNBAddress) ? reserves['reserve0'] : reserves['reserve1'];
    const reserveSDOGE = (reserveWBNB === reserves['reserve0']) ? reserves['reserve1'] : reserves['reserve0'];
    const bnbLpAdded = reserveWBNB * lpShare / 100 / 10 ** 18;
    const sdogeLpAdded = reserveSDOGE * lpShare / 100 / 10 ** 9;
    const collected = await scholarDogeToken.methods.totalCollected().call() / 10 ** 9;

    return new TokenStatsInfo(supply, burned, sdogeLpAdded, bnbLpAdded, collected);
}

export const getTokenConstraints = async () => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const scholarDogeDividendTracker = getScholarDogeDividendTrackerContract(web3);
    const maxHold = await scholarDogeToken.methods.maxHold().call() / 10 ** 9;
    const maxSellTx = await scholarDogeToken.methods.maxSellTx().call() / 10 ** 9;
    const claimWait = await scholarDogeDividendTracker.methods.claimWait().call() / HOUR;

    return new TokenConstraintsInfo(maxHold, maxSellTx, claimWait);
}

export const getTokenDependenciesInfo = async () => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const dexStruct = await scholarDogeToken.methods.dexStruct().call();
    const router = dexStruct['router'];
    const pair = dexStruct['pair'];
    const dividendTracker = await scholarDogeToken.methods.dividendTracker().call();

    return new TokenDependenciesInfo(router, pair, dividendTracker);
}
