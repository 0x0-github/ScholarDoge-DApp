import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeTreasury} from "./useContract";

const useTreasuryConfirmTx = (txIndex: number) => {
    const {account} = useWeb3React();
    const treasury = useScholarDogeTreasury();

    const handleTreasuryConfirmTx = useCallback(
        async () => {
            if (account) {
                await treasury.methods.confirmTx(txIndex).call();
            }
        },
        [account, txIndex, treasury.methods],
    )

    return {onTreasuryConfirmTx: handleTreasuryConfirmTx};
}

export default useTreasuryConfirmTx;
