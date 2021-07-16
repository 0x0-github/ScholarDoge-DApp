import {InjectedConnector} from '@web3-react/injected-connector';
import {WalletConnectConnector} from '@web3-react/walletconnect-connector';
import {BscConnector} from '@binance-chain/bsc-connector';
import Web3 from 'web3';
import getNodeUrl from './getRpcUrl';
import chains from "../config/constants/chains";
import {ConnectorNames} from "../shared/widgets/WalletModal";
import {IRPCMap} from "@walletconnect/types";

const POLLING_INTERVAL = 12000;
const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
    : chains.mainnet.toString(), 10);
const rpcUrl = getNodeUrl(chainId === chains.mainnet);

const injected = new InjectedConnector({supportedChainIds: [chainId]});

const walletConnect = new WalletConnectConnector({
    rpc: {[chainId]: rpcUrl} as IRPCMap,
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
});

const bscConnector = new BscConnector({supportedChainIds: [chainId]});

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletConnect,
    [ConnectorNames.BSC]: bscConnector,
}

export const getLibrary = (provider: any): Web3 => {
    return provider;
}
