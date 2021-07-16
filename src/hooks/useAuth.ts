import {useCallback} from 'react';
import {useWeb3React, UnsupportedChainIdError} from '@web3-react/core';
import {NoBscProviderError} from '@binance-chain/bsc-connector';
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import {ConnectorNames, connectorLocalStorageKey} from '../shared/widgets/WalletModal';
import {connectorsByName} from '../utils/web3React';
import {setupNetwork} from '../utils/wallet';
import useToast from './useToast';
import {useTranslation} from "react-i18next";

const useAuth = () => {
    const {t} = useTranslation('common');
    const {activate, deactivate} = useWeb3React();
    const toast = useToast();

    const login = useCallback(
        (connectorID: ConnectorNames) => {
            const connector = connectorsByName[connectorID];

            if (connector) {
                activate(connector, async (error: Error) => {

                    if (error instanceof UnsupportedChainIdError) {
                        const hasSetup = await setupNetwork();

                        if (hasSetup) {
                            activate(connector);
                        }
                    } else {
                        window.localStorage.removeItem(connectorLocalStorageKey)

                        if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                            toast?.toastError(t('Provider Error'), t('No provider was found'));
                        } else if (
                            error instanceof UserRejectedRequestErrorInjected ||
                            error instanceof UserRejectedRequestErrorWalletConnect
                        ) {
                            if (connector instanceof WalletConnectConnector) {
                                const walletConnector = connector as WalletConnectConnector;

                                walletConnector.walletConnectProvider = null;
                            }

                            toast?.toastError(t('Authorization Error'), t('Please authorize to access your account'));
                        } else {
                            toast?.toastError(error.name, error.message);
                        }
                    }
                })
            } else {
                toast?.toastError(t('Unable to find connector'), t('The connector config is wrong'));
            }
        },
        [t, activate, toast],
    );

    const logout = useCallback(() => {
        deactivate();
        // This localStorage key is set by @web3-react/walletconnect-connector
        if (window.localStorage.getItem('walletconnect')) {
            connectorsByName.walletconnect.close()
            connectorsByName.walletconnect.walletConnectProvider = null
        }
    }, [deactivate]);

    return {login, logout};
}

export default useAuth;