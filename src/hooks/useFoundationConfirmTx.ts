import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeFoundation} from "./useContract";

const useFoundationConfirmTx = (txIndex: number) => {
    const {account} = useWeb3React();
    const foundation = useScholarDogeFoundation();

    const handleFoundationConfirmTx = useCallback(
        async () => {
            if (account) {
                await foundation.methods.confirmTx(txIndex).call();
            }
        },
        [account, txIndex, foundation.methods],
    )

    return {onFoundationConfirmTx: handleFoundationConfirmTx};
}

export default useFoundationConfirmTx;
