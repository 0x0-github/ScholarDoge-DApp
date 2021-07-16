import web3 from './web3';
import {getScholarDogeDividendTrackerContract, getScholarDogeTokenContract} from "./contractHelpers";
import {UserDividendsInfo} from "../models/UserDividendsInfo";
import {ProjectWalletInfo} from "../models/ProjectWalletInfo";
import chains from "../config/constants/chains";
import contracts from "../config/constants/contracts";

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
