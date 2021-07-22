import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "./header/Header";
import {useWeb3React} from "@web3-react/core";
import { Helmet } from 'react-helmet'
import useAuth from "./hooks/useAuth";
import Rewards from "./rewards/Rewards";
import useEagerConnect from "./hooks/useEagerConnect";
import Tokenomics from "./tokenomics/Tokenomics";

const TITLE = "ScholarDogeDApp";
const TOKENOMICS_PREFIX = 'tok_';
const REWARDS_PREFIX = 'rew_';

function App() {
    useEagerConnect();
    const {account} = useWeb3React();
    const {login, logout} = useAuth();

    return (
        <Suspense fallback="loading">
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className="App">
                <Header account={account ? account : undefined} login={login} logout={logout}/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Tokenomics key={TOKENOMICS_PREFIX + account} account={account}/>
                        </Route>
                        <Route path="/tokenomics">
                            <Tokenomics key={TOKENOMICS_PREFIX + account} account={account}/>
                        </Route>
                        <Route path="/rewards">
                            <Rewards key={REWARDS_PREFIX + account} account={account}/>
                        </Route>
                        <Route path="/lottery">
                        </Route>
                        <Route path="/team">
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </Suspense>
    );
}

export default App;
