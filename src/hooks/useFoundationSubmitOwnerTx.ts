import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeFoundation} from "./useContract";

const useFoundationSubmitOwnerTx = (ownerAddress: string) => {
    const {account} = useWeb3React();
    const foundation = useScholarDogeFoundation();

    const handleFoundationSubmitOwnerTx = useCallback(
        async () => {
            if (account) {
                await foundation.methods.submitOwnerTx(ownerAddress).call();
            }
        },
        [account, ownerAddress, foundation.methods],
    )

    return {onFoundationSubmitOwnerTx: handleFoundationSubmitOwnerTx};
}

export default useFoundationSubmitOwnerTx;
