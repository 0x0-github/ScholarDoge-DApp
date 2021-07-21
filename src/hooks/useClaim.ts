import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDoge} from "./useContract";

const useClaim = () => {
    const {account} = useWeb3React();
    const scholarDoge = useScholarDoge();

    const handleClaim = useCallback(
        async () => {
            if (account) {
                await scholarDoge.methods.claim().send({from: account});
            }
        },
        [account, scholarDoge.methods],
    )

    return {onClaim: handleClaim};
}

export default useClaim;
