import {useMemo} from 'react'
import useWeb3 from './useWeb3'
import {
    getFoundationContract,
    getMarketingContract,
    getScholarDogeDividendTrackerContract,
    getScholarDogeTestDispatcherContract,
    getScholarDogeTokenContract, getTreasuryContract,
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

export const useScholarDogeTestDispatcher = () => {
    const web3 = useWeb3()
    return useMemo(() => getScholarDogeTestDispatcherContract(web3), [web3])
}

export const useScholarDogeTreasury = () => {
    const web3 = useWeb3()
    return useMemo(() => getTreasuryContract(web3), [web3])
}

export const useScholarDogeMarketing = () => {
    const web3 = useWeb3()
    return useMemo(() => getMarketingContract(web3), [web3])
}

export const useScholarDogeFoundation = () => {
    const web3 = useWeb3()
    return useMemo(() => getFoundationContract(web3), [web3])
}

export const useWBNBDexPair = () => {
    const web3 = useWeb3()
    return useMemo(() => getWBNBDexPairContract(web3), [web3])
}
