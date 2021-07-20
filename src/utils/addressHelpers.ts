import contracts from '../config/constants/contracts';
import chains from '../config/constants/chains';
import {IAddress} from "./types";

export const getAddress = (address: IAddress): string => {
    const chainId = process.env.REACT_APP_CHAIN_ID ? Number.parseInt(process.env.REACT_APP_CHAIN_ID, 10)
        : chains.mainnet;

    // @ts-ignore
    return address[chainId];
}

export const getScholarDogeTokenAddress = () => {
    return getAddress(contracts.scholarDogeToken);
}

export const getScholarDogeDividendTrackerAddress = () => {
    return getAddress(contracts.scholarDogeDividendTracker);
}

export const getWBNBDexPairAddress = () => {
    return getAddress(contracts.dexPair);
}

export const getWbnbAddress = () => {
    return getAddress(contracts.wbnb);
}

export const getLotteryAddress = () => {
    return getAddress(contracts.lottery);
}

export const getChainlinkOracleAddress = () => {
    return getAddress(contracts.chainlinkOracle);
}
