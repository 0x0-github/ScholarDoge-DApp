import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeFoundation} from "./useContract";

const useFoundationExecuteTransaction = (txIndex: number) => {
    const {account} = useWeb3React();
    const foundation = useScholarDogeFoundation();

    const handleExecuteTransaction = useCallback(
        async () => {
            if (account) {
                await foundation.methods.executeTransaction(txIndex).call();
            }
        },
        [account, txIndex, foundation.methods],
    )

    return {onFoundationExecuteTransaction: handleExecuteTransaction};
}

export default useFoundationExecuteTransaction;
