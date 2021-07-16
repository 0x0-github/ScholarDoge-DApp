import Web3 from 'web3';
import {HttpProviderOptions} from 'web3-core-helpers';
import urls from '../config/constants/urls';
import chains from "../config/constants/chains";
import getNodeUrl from "./getRpcUrl";

const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
    : chains.mainnet.toString(), 10);
const rpcUrl = getNodeUrl(chainId === chains.mainnet);
const httpProvider = new Web3.providers.HttpProvider(rpcUrl, {timeout: 10000} as HttpProviderOptions);
const web3NoAccount = new Web3(httpProvider);

const archivedHttpProvider = new Web3.providers.HttpProvider(urls.archivedNode, {timeout: 10000} as HttpProviderOptions);
export const web3WithArchivedNodeProvider = new Web3(archivedHttpProvider);

export default web3NoAccount;
