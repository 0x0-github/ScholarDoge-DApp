import React, {Suspense} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./header/Header";
import {useWeb3React} from "@web3-react/core";
import useAuth from "./hooks/useAuth";
import Dashboard from "./dashboard/Dashboard";
import useEagerConnect from "./hooks/useEagerConnect";

function App() {
    useEagerConnect();
    const {account} = useWeb3React();
    const {login, logout} = useAuth();

    return (
        <Suspense fallback="loading">
                <div className="App">
                    <Header account={account ? account : undefined} login={login} logout={logout}/>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/">
                                <Dashboard key={account} account={account}/>
                            </Route>
                            <Route path="lottery">
                            </Route>
                            <Route path="team">
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
        </Suspense>
    );
}

export default App;
