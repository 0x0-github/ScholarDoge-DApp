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
import CollectedRewardsBlock from "./components/CollectedRewardsBlock";

class Dashboard extends Component<any, any> {
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

    async componentDidMount() {
        let userInfo;

        if (this.props.account) {
            userInfo = await getUserDividendsInfo(this.props.account);
        }

        const treasuryInfo = await getTreasuryWalletInfo();
        const marketingInfo = await getMarketingWalletInfo();
        const foundationInfo = await getFoundationWalletInfo();
        const teamTimelockInfo = await getTeamTimelockWalletInfo();

        this.setState({
            userDividendInfo: userInfo,
            treasuryInfo: treasuryInfo,
            marketingInfo: marketingInfo,
            foundationInfo: foundationInfo,
            teamTimelockInfo: teamTimelockInfo
        });
    }

    render() {
        let content;

        if (this.state.userDividendInfo == null) {
            const userInfo = new UserDividendsInfo('', 0, 0, 0, 0, 0, 0);

            return (<div className="content">
                <PendingRewardsBlock key={userInfo} info={userInfo}/>
                <CollectedRewardsBlock key={userInfo} info={userInfo}/>
            </div>);
        } else {
            const userInfo = this.state.userDividendInfo;

            return (<div className="content">
                <PendingRewardsBlock key={userInfo} info={userInfo}/>
                <CollectedRewardsBlock key={userInfo} info={userInfo}/>
            </div>);
        }
    }
}

export default Dashboard;
