// Set of helper functions to facilitate wallet setup

import urls from '../config/constants/urls';
import chains from "../config/constants/chains";
import WindowChain from "../react-app-env";

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
    const provider = (window as WindowChain).ethereum;

    if (provider) {
        const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
            : chains.mainnet.toString(), 10)

        try {
            const mainnet = chainId === chains.mainnet;
            const rpcs = mainnet ? urls.mainnetRpcs : urls.testnetRpcs;
            const name = 'Binance Smart Chain ' + (mainnet) ? 'Mainnet' : 'Testnet';

            await provider.request!({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`,
                        chainName: name,
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'bnb',
                            decimals: 18,
                        },
                        rpcUrls: rpcs,
                        // @ts-ignore
                        blockExplorerUrls: [`${urls.baseBscScanURL[chainId]}/`],
                    },
                ],
            })

            return true;
        } catch (error) {
            console.error(error);

            return false
        }
    } else {
        console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");

        return false;
    }
}
