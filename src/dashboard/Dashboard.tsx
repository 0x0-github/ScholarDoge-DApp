import React, {Component} from 'react';
import './Dashboard.css';
import {
    getFoundationWalletInfo,
    getMarketingWalletInfo,
    getTeamTimelockWalletInfo,
    getTreasuryWalletInfo,
    getUserDividendsInfo
} from "../utils/callHelpers";
import PendingRewardsBlock from "./components/PendingRewardsBlock";
import {UserDividendsInfo} from "../models/UserDividendsInfo";
import {ProjectWalletInfo} from "../models/ProjectWalletInfo";

class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            userDividendInfo: UserDividendsInfo,
            treasuryInfo: ProjectWalletInfo,
            marketingInfo: ProjectWalletInfo,
            foundationInfo: ProjectWalletInfo,
            teamTimelockInfo: ProjectWalletInfo
        };
    }

    componentDidMount() {
        if (this.props.account) {
            getUserDividendsInfo(this.props.account).then(result => this.setState({userDividendInfo: result}));
        }

        getTreasuryWalletInfo().then(result => this.setState({treasuryInfo: result}));
        getMarketingWalletInfo().then(result => this.setState({marketingInfo: result}));
        getFoundationWalletInfo().then(result => this.setState({foundationInfo: result}));
        getTeamTimelockWalletInfo().then(result => this.setState({teamTimelockInfo: result}));
    }

    render() {
        return (
            <div className="content">
                <PendingRewardsBlock props={this.state.userDividendInfo}/>
            </div>
        );
    }
}

export default Dashboard;
