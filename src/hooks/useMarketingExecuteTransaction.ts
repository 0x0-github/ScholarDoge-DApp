import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeMarketing} from "./useContract";

const useMarketingExecuteTransaction = (txIndex: number) => {
    const {account} = useWeb3React();
    const marketing = useScholarDogeMarketing();

    const handleExecuteTransaction = useCallback(
        async () => {
            if (account) {
                await marketing.methods.executeTransaction(txIndex).call();
            }
        },
        [account, txIndex, marketing.methods],
    )

    return {onMarketingExecuteTransaction: handleExecuteTransaction};
}

export default useMarketingExecuteTransaction;
