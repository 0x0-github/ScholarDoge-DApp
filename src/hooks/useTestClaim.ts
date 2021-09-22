import {useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDogeTestDispatcher} from "./useContract";

const useTestClaim = () => {
    const {account} = useWeb3React();
    const scholarDoge = useScholarDogeTestDispatcher();

    const handleClaim = useCallback(
        async () => {
            if (account) {
                await scholarDoge.methods.claim().send({from: account});
            }
        },
        [account, scholarDoge.methods],
    )

    return {onTestClaim: handleClaim};
}

export default useTestClaim;
