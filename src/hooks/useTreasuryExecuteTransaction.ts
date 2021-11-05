import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeTreasury} from "./useContract";

const useTreasuryExecuteTransaction = (txIndex: number) => {
    const {account} = useWeb3React();
    const treasury = useScholarDogeTreasury();

    const handleExecuteTransaction = useCallback(
        async () => {
            if (account) {
                await treasury.methods.executeTransaction(txIndex).call();
            }
        },
        [account, txIndex, treasury.methods],
    )

    return {onTreasuryExecuteTransaction: handleExecuteTransaction};
}

export default useTreasuryExecuteTransaction;
