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

// TODO : Up here if updates
const MIN_TO_SWAP = 100000000000000000000000;
const HOUR = 3600;

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

    return lodash.round(MIN_TO_SWAP * reserveWBNB / reserveSDOGE * rewardShare * seconds / HOUR) / 10 ** 18;
}

export const getTotalRewards = async () => {
    const scholarDogeDividendTracker = getScholarDogeDividendTrackerContract(web3);

    return Number.parseInt(await scholarDogeDividendTracker.methods.totalDividendsDistributed().call()) / 10 ** 18;
}
