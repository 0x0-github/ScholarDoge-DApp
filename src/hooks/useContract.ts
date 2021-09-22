import {useMemo} from 'react'
import useWeb3 from './useWeb3'
import {
    getScholarDogeTestDispatcherContract,
    getScholarDogeTokenContract,
    getWBNBDexPairContract
} from "../utils/contractHelpers";

export const useScholarDoge = () => {
    const web3 = useWeb3()
    return useMemo(() => getScholarDogeTokenContract(web3), [web3])
}

export const useScholarDogeTestDispatcher = () => {
    const web3 = useWeb3()
    return useMemo(() => getScholarDogeTestDispatcherContract(web3), [web3])
}

export const useWBNBDexPair = () => {
    const web3 = useWeb3()
    return useMemo(() => getWBNBDexPairContract(web3), [web3])
}
