import {useEffect, useState} from 'react';
import BigNumber from 'bignumber.js';
import {useWeb3React} from '@web3-react/core';
import {BIG_ZERO} from '../utils/bigNumber';
import useWeb3 from './useWeb3';
import useLastUpdated from './useLastUpdated';

type UseTokenBalanceState = {
    balance: BigNumber
    fetchStatus: FetchStatus
}

export enum FetchStatus {
    NOT_FETCHED = 'not-fetched',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export const useGetBnbBalance = () => {
    const [balance, setBalance] = useState(BIG_ZERO)
    const {account} = useWeb3React()
    const {lastUpdated, setLastUpdated} = useLastUpdated()
    const web3 = useWeb3()

    useEffect(() => {
        const fetchBalance = async () => {
            const walletBalance = await web3.eth.getBalance(account!)
            setBalance(new BigNumber(walletBalance))
        }

        if (account) {
            fetchBalance()
        }
    }, [account, web3, lastUpdated, setBalance])

    return {balance, refresh: setLastUpdated}
}

export default useGetBnbBalance;
