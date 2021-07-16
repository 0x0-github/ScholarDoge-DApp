import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import web3NoAccount from './web3';
import chains from '../config/constants/chains';

// Addresses
import {
    getAddress,
    getScholarDogeTokenAddress,
    getScholarDogeDividendTrackerAddress,
    getWbnbAddress,
    getLotteryAddress,
    getChainlinkOracleAddress,
} from './addressHelpers';

// ABI
import scholarDogeTokenAbi from '../config/abi/ScholarDogeToken.json'
import scholarDogeDividendTrackerAbi from '../config/abi/ScholarDogeDividendTracker.json'

import {getSettings, getGasPriceInWei} from './settings'
import contracts from "../config/constants/contracts";

export const getDefaultGasPrice = () => {
    const chainId = parseInt(
        (process.env.REACT_APP_CHAIN_ID) ? process.env.REACT_APP_CHAIN_ID : chains.mainnet.toString(), 10);

    if (chainId === chains.testnet) {
        return 10;
    }

    // @ts-ignore
    return Number.parseInt(chains.gasPrice[chainId], 10);
}

const getContract = (abi: any, address: string, web3?: Web3, account?: string) => {
    const _web3 = web3 ?? web3NoAccount;
    const gasPrice = account ? getSettings(account).gasPrice : getDefaultGasPrice();

    return new _web3.eth.Contract(abi as unknown as AbiItem, address, {
        gasPrice: getGasPriceInWei(gasPrice).toString(),
    });
}

export const getScholarDogeTokenContract = (web3?: Web3) => {
    return getContract(scholarDogeTokenAbi, getScholarDogeTokenAddress(), web3);
}

export const getScholarDogeDividendTrackerContract = (web3?: Web3) => {
    return getContract(scholarDogeDividendTrackerAbi, getScholarDogeDividendTrackerAddress(), web3);
}
