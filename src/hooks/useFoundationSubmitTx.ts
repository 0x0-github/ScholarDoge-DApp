import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeFoundation} from "./useContract";

const useFoundationSubmitTx = (to: string, value: number, data?: string, isBnb: boolean = true) => {
    const {account} = useWeb3React();
    const foundation = useScholarDogeFoundation();

    const handleFoundationSubmitTx = useCallback(
        async () => {
            if (account) {
                await foundation.methods.submitTx(to, value, data, isBnb).call();
            }
        },
        [account, to, value, data, isBnb, foundation.methods],
    )

    return {onFoundationSubmitTx: handleFoundationSubmitTx};
}

export default useFoundationSubmitTx;
