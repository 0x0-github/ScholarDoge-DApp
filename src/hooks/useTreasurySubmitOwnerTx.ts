import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeTreasury} from "./useContract";

const useTreasurySubmitOwnerTx = (ownerAddress: string) => {
    const {account} = useWeb3React();
    const treasury = useScholarDogeTreasury();

    const handleTreasurySubmitOwnerTx = useCallback(
        async () => {
            if (account) {
                await treasury.methods.submitOwnerTx(ownerAddress).call();
            }
        },
        [account, ownerAddress, treasury.methods],
    )

    return {onTreasurySubmitOwnerTx: handleTreasurySubmitOwnerTx};
}

export default useTreasurySubmitOwnerTx;
