import {useMemo} from 'react'
import useWeb3 from './useWeb3'
import {
    getScholarDogeDividendTrackerContract,
    getScholarDogeTokenContract,
    getWBNBDexPairContract
} from "../utils/contractHelpers";

export const useScholarDoge = () => {
    const web3 = useWeb3()
    return useMemo(() => getScholarDogeTokenContract(web3), [web3])
}

export const useScholarDogeDividendTracker = () => {
    const web3 = useWeb3()
    return useMemo(() => getScholarDogeDividendTrackerContract(web3), [web3])
}

export const useWBNBDexPair = () => {
    const web3 = useWeb3()
    return useMemo(() => getWBNBDexPairContract(web3), [web3])
}
