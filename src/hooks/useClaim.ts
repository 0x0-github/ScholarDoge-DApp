import {useCallback, useEffect} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useScholarDoge} from "./useContract";
import contracts from "../config/constants/contracts";
import chains from "../config/constants/chains";

const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
    : chains.mainnet.toString(), 10);

// @ts-ignore
const useClaim = (rewardToken: string = contracts.wbnb[chainId]) => {
    const {account} = useWeb3React();
    const scholarDoge = useScholarDoge();

    const handleClaim = useCallback(
        async () => {
            if (account) {
                await scholarDoge.methods.claim(rewardToken).send({from: account});
            }
        },
        [account, scholarDoge.methods],
    )

    return {onClaim: handleClaim};
}

export default useClaim;
