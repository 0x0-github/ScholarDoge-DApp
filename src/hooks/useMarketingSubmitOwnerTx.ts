import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeMarketing} from "./useContract";

const useMarketingSubmitOwnerTx = (ownerAddress: string) => {
    const {account} = useWeb3React();
    const marketing = useScholarDogeMarketing();

    const handleMarketingSubmitOwnerTx = useCallback(
        async () => {
            if (account) {
                await marketing.methods.submitOwnerTx(ownerAddress).call();
            }
        },
        [account, ownerAddress, marketing.methods],
    )

    return {onMarketingSubmitOwnerTx: handleMarketingSubmitOwnerTx};
}

export default useMarketingSubmitOwnerTx;
