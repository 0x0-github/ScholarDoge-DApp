import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeMarketing} from "./useContract";

const useMarketingConfirmTx = (txIndex: number) => {
    const {account} = useWeb3React();
    const marketing = useScholarDogeMarketing();

    const handleMarketingConfirmTx = useCallback(
        async () => {
            if (account) {
                await marketing.methods.confirmTx(txIndex).call();
            }
        },
        [account, txIndex, marketing.methods],
    )

    return {onMarketingConfirmTx: handleMarketingConfirmTx};
}

export default useMarketingConfirmTx;
