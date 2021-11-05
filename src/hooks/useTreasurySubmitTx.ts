import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeTreasury} from "./useContract";

const useTreasurySubmitTx = (to: string, value: number, data?: string, isBnb: boolean = true) => {
    const {account} = useWeb3React();
    const treasury = useScholarDogeTreasury();

    const handleTreasurySubmitTx = useCallback(
        async () => {
            if (account) {
                await treasury.methods.submitTx(to, value, data, isBnb).call();
            }
        },
        [account, to, value, data, isBnb, treasury.methods],
    )

    return {onTreasurySubmitTx: handleTreasurySubmitTx};
}

export default useTreasurySubmitTx;
