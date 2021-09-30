import web3 from './web3';
import {
    getBEP20TokenContract, getDexFactoryContract, getDexPairContract, getScholarDogeDividendTrackerContract,
    getScholarDogeTokenContract, getWBNBBUSDPairContract,
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
import {RewardTokenInfo} from "../models/RewardTokenInfo";

// TODO : Up here if updates
const HOUR_SECONDS = 3600;
const DAY_SECONDS = 86400;
// Estimating rewards based on volume. Later using an oracle should help.
const EST_DAILY_VOLUME = 1000000;
const BURN_ADDR1 = '0x0000000000000000000000000000000000000000';
const BURN_ADDR2 = '0x000000000000000000000000000000000000dEaD';

const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
    : chains.mainnet.toString(), 10);
// @ts-ignore
const defaultReward = contracts.wbnb[chainId];

export const getUserDividendsInfo = async (account: string, rewardToken: string = defaultReward) => {
    const dividendTrackerContract = getScholarDogeDividendTrackerContract(web3);
    const rewardTokenContract = getBEP20TokenContract(web3, rewardToken);
    const info = await dividendTrackerContract.methods.getAccount(account, rewardToken).call();
    const rewardDecimals = await rewardTokenContract.methods.decimals().call();

    return new UserDividendsInfo(account, info['iterationsUntilProcessed'],
        info['withdrawableDividends'] / 10 ** rewardDecimals,
        info['totalDividends'] / 10 ** rewardDecimals,
        info['lastClaimTime'], info['nextClaimTime'], info['secondsUntilAutoClaimAvailable']);
}

export const getProjectWalletInfo = async (account: string, rewardToken: string = defaultReward) => {
    const walletUserInfo = await getUserDividendsInfo(account, rewardToken);
    const scholarDogeTokenContract = getScholarDogeTokenContract(web3);
    const walletTokens = await scholarDogeTokenContract.methods.balanceOf(account).call() / 10 ** 9;
    let walletReward;

    if (rewardToken === defaultReward) {
        walletReward = Number.parseInt(await web3.eth.getBalance(account)) / 10 ** 18;
    } else {
        const rewardTokenContract = getBEP20TokenContract(web3, rewardToken);
        const rewardDecimals = await rewardTokenContract.methods.decimals().call();

        walletReward = await rewardTokenContract.methods.balanceOf(account).call() / 10 ** rewardDecimals;
    }

    return new ProjectWalletInfo(walletTokens, walletReward, walletUserInfo);
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

export const getEstimatedRewards = async (account: string, rewardToken: string = defaultReward,
                                          dailyVolume: number = EST_DAILY_VOLUME,
                                          seconds: number = 3600) => {
    // @ts-ignore
    const wBNBAddress = defaultReward;
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const tokenBalance = await scholarDogeToken.methods.balanceOf(account).call();
    const rewardShare = tokenBalance / await scholarDogeToken.methods.totalSupply().call() * 100;
    // TODO replace assignation with getWBNBBUSDPairContract(web3), only used for
    const wbnbBusdPair = getWBNBBUSDPairContract(web3);
    const reserves = await wbnbBusdPair.methods.getReserves().call();
    const token0 = await wbnbBusdPair.methods.token0().call();
    const reserveWBNB = (token0 === wBNBAddress) ? reserves['reserve0'] : reserves['reserve1'];
    const reserveBUSD = (reserveWBNB === reserves['reserve0']) ? reserves['reserve1'] : reserves['reserve0'];
    const bnbDailyVolume = dailyVolume * reserveWBNB / reserveBUSD;
    const feeStruct = await scholarDogeToken.methods.feeStruct().call();
    let baseComputing;
    let decimals;

    if (rewardToken === defaultReward) {
        baseComputing = bnbDailyVolume;
        decimals = 18;
    } else {
        const rewardTokenContract = getBEP20TokenContract(web3, rewardToken);
        const dexFactoryContract = getDexFactoryContract(web3);
        const wbnbRewardTokenPairAddress = await dexFactoryContract.methods.getPair(rewardToken, wBNBAddress).call();
        const wbnbRewardTokenPair = getDexPairContract(web3, wbnbRewardTokenPairAddress);
        const rewardReserves = await wbnbRewardTokenPair.methods.getReserves().call();
        const rewardToken0 = await wbnbRewardTokenPair.methods.token0().call();
        const rewardReserveWBNB = (rewardToken0 === wBNBAddress) ? rewardReserves['reserve0']
            : rewardReserves['reserve1'];
        const rewardReserveOtherToken = (rewardReserveWBNB === rewardReserves['reserve0'])
            ? rewardReserves['reserve1'] : rewardReserves['reserve0'];

        console.log("daily volume:");
        console.log(dailyVolume);
        console.log("bnb daily volume:");
        console.log(bnbDailyVolume);
        console.log("reward reserve other token");
        console.log(rewardReserveOtherToken);
        console.log("reward reserve wbnb");
        console.log(rewardReserveWBNB);

        decimals = await rewardTokenContract.methods.decimals().call();
        baseComputing = bnbDailyVolume * rewardReserveOtherToken * 10 ** (18 - decimals) / rewardReserveWBNB;

        // TODO: Take care about routing when changing reward token.
    }

    const result = lodash.round(baseComputing / DAY_SECONDS * seconds * feeStruct['rewardFee']
        / 100 * rewardShare / 100) / 10 ** decimals;

    console.log("base computing");
    console.log(baseComputing);
    console.log("reward share");
    console.log(rewardShare);
    console.log("day seconds");
    console.log(DAY_SECONDS);
    console.log("seconds");
    console.log(seconds);
    console.log("decimals");
    console.log(decimals);
    console.log("result");
    console.log(result);

    return result;
}

export const getTotalRewards = async (rewardToken: string = defaultReward) => {
    const dividendTrackerContract = getScholarDogeDividendTrackerContract(web3);
    const rewardTokenContract = getBEP20TokenContract(web3, rewardToken);
    const holders = await dividendTrackerContract.methods.getNumberOfTokenHolders().call();
    const rewards = await dividendTrackerContract.methods.totalDividendsDistributed(rewardToken).call()
        / 10 ** (await rewardTokenContract.methods.decimals().call());

    return new TotalRewardsInfo(holders, rewards);
}

export const getTokenFeatures = async () => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const feeStruct = await scholarDogeToken.methods.feeStruct().call();
    const rewardStruct = await scholarDogeToken.methods.rewardStruct().call();

    return new TokenFeaturesInfo(feeStruct['rewardFee'], feeStruct['lpFee'],
        feeStruct['treasuryFee'], feeStruct['burnFee'], rewardStruct['rewardToken'],
        rewardStruct['swapSlippage'], rewardStruct['rewardSlippage']);
}

export const getTokenStats = async () => {
    // @ts-ignore
    const wBNBAddress = defaultReward;
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
    const collected = await scholarDogeToken.methods.treasuryFeeCollected().call() / 10 ** 9;

    return new TokenStatsInfo(supply, burned, sdogeLpAdded, bnbLpAdded, collected);
}

export const getTokenConstraints = async () => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const dividendTracker = getScholarDogeDividendTrackerContract(web3);
    const maxHold = await scholarDogeToken.methods.maxHold().call() / 10 ** 9;
    const maxSellTx = await scholarDogeToken.methods.maxSellTx().call() / 10 ** 9;
    const claimWait = await dividendTracker.methods.claimWait().call() / HOUR_SECONDS;

    return new TokenConstraintsInfo(maxHold, maxSellTx, claimWait);
}

export const getTokenDependenciesInfo = async () => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const dexStruct = await scholarDogeToken.methods.dexStruct().call();
    const router = dexStruct['router'];
    const pair = dexStruct['pair'];

    return new TokenDependenciesInfo(router, pair);
}

export const getScholarDogeBalance = async (account: string) => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);

    return Number.parseInt(await scholarDogeToken.methods.balanceOf(account).call()) / 10 ** 9;
}

export const getToken = async (address: string) => {
    const rewardTokenContract = getBEP20TokenContract(web3, address);
    const decimals = await rewardTokenContract.methods.decimals().call();
    let name = await rewardTokenContract.methods.name().call();
    let symbol = await rewardTokenContract.methods.symbol().call();

    return new RewardTokenInfo(
        address,
        name,
        symbol,
        decimals,
    );
}

export const getRewardTokens = async () => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const rewardTokenCount = await scholarDogeToken.methods.rewardTokenCount().call();
    const rewardTokens = [];

    for (let i = 0; i < rewardTokenCount; ++i) {
        const address = await scholarDogeToken.methods.rewardTokens(i).call();
        const rewardTokenContract = getBEP20TokenContract(web3, address);
        const decimals = await rewardTokenContract.methods.decimals().call();
        let name = await rewardTokenContract.methods.name().call();
        let symbol = await rewardTokenContract.methods.symbol().call();

        if (symbol === "WBNB") {
            name = "Binance Smart Chain";
            symbol = "BNB";
        }

        rewardTokens.push(
            new RewardTokenInfo(
                address,
                name,
                symbol,
                decimals,
            )
        );
    }

    return rewardTokens;
}

export const getCurrentRewardToken = async () => {
    const scholarDogeToken = getScholarDogeTokenContract(web3);
    const rewardStruct = await scholarDogeToken.methods.rewardStruct().call();
    const address = rewardStruct["rewardToken"];
    const rewardTokenContract = getBEP20TokenContract(web3, address);

    return new RewardTokenInfo(
        address,
        await rewardTokenContract.methods.name().call(),
        await rewardTokenContract.methods.symbol().call(),
        await rewardTokenContract.methods.decimals().call(),
    );
}