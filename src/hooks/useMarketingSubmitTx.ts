import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeMarketing} from "./useContract";

const useMarketingSubmitTx = (to: string, value: number, data?: string, isBnb: boolean = true) => {
    const {account} = useWeb3React();
    const marketing = useScholarDogeMarketing();

    const handleMarketingSubmitTx = useCallback(
        async () => {
            if (account) {
                await marketing.methods.submitTx(to, value, data, isBnb).call();
            }
        },
        [account, to, value, data, isBnb, marketing.methods],
    )

    return {onMarketingSubmitTx: handleMarketingSubmitTx};
}

export default useMarketingSubmitTx;
