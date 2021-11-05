import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import web3NoAccount from './web3';
import chains from '../config/constants/chains';

// Addresses
import {
    getScholarDogeTokenAddress,
    getScholarDogeDividendTrackerAddress,
    getScholarDogeTestDispatcherAddress,
    getWBNBDexPairAddress,
    getDexFactoryAddress, getWBNBBUSDPairAddress, getMarketingAddress, getTreasuryAddress, getFoundationAddress
} from './addressHelpers';

// ABI
import scholarDogeTokenAbi from '../config/abi/ScholarDogeToken.json';
import scholarDogeDividendTrackerAbi from '../config/abi/ScholarDogeDividendTracker.json';
import scholarDogeTestDispatcherAbi from '../config/abi/ScholarDogeTestDispatcher.json';
import scholarDogeMultisigAbi from '../config/abi/ScholarDogeMultisig.json';
import dexPairAbi from '../config/abi/IPancakePair.json';
import bep20Abi from '../config/abi/BEP20.json';
import iPancakeFactoryAbi from '../config/abi/IPancakeFactory.json';

import {getGasPriceInWei, getSettings} from './settings';

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

export const getDexPairContract = (web3?: Web3, address: string = '') => {
    return getContract(dexPairAbi, address, web3);
}

export const getScholarDogeTokenContract = (web3?: Web3) => {
    return getContract(scholarDogeTokenAbi, getScholarDogeTokenAddress(), web3);
}

export const getScholarDogeDividendTrackerContract = (web3?: Web3) => {
    return getContract(scholarDogeDividendTrackerAbi, getScholarDogeDividendTrackerAddress(), web3);
}

export const getScholarDogeTestDispatcherContract = (web3?: Web3) => {
    return getContract(scholarDogeTestDispatcherAbi, getScholarDogeTestDispatcherAddress(), web3);
}

export const getWBNBDexPairContract = (web3?: Web3) => {
    return getDexPairContract(web3, getWBNBDexPairAddress());
}

export const getWBNBBUSDPairContract = (web3?: Web3) => {
    return getDexPairContract(web3, getWBNBBUSDPairAddress());
}

export const getBEP20TokenContract = (web3?: Web3, address: string = '') => {
    return getContract(bep20Abi, address, web3);
}

export const getDexFactoryContract = (web3?: Web3) => {
    return getContract(iPancakeFactoryAbi, getDexFactoryAddress(), web3);
}

export const getMarketingContract = (web3?: Web3) => {
    return getContract(scholarDogeMultisigAbi, getMarketingAddress(), web3);
}

export const getTreasuryContract = (web3?: Web3) => {
    return getContract(scholarDogeMultisigAbi, getTreasuryAddress(), web3);
}

export const getFoundationContract = (web3?: Web3) => {
    return getContract(scholarDogeMultisigAbi, getFoundationAddress(), web3);
}
