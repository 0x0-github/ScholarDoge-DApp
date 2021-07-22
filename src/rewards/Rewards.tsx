import React, {Component, HTMLAttributes} from 'react';
import './Rewards.css';
import {
    getEstimatedRewards,
    getFoundationWalletInfo,
    getMarketingWalletInfo,
    getTeamTimelockWalletInfo, getTotalRewards,
    getTreasuryWalletInfo,
    getUserDividendsInfo
} from "../utils/callHelpers";
import PendingRewardsBlock from "./components/PendingRewardsBlock";
import {UserDividendsInfo} from "../models/UserDividendsInfo";
import {ProjectWalletInfo} from "../models/ProjectWalletInfo";
import CollectedRewardsBlock from "./components/CollectedRewardsBlock";
import {Grid} from "@material-ui/core";
import EstimatedRewardsBlock, { HOUR} from "./components/EstimatedRewardsBlock";
import TotalRewardsBlock from "./components/TotalRewardsBlock";
import ProjectWalletBlock from "./components/ProjectWalletBlock";
import styled from "styled-components";

class Rewards extends Component<any, any> {
    readonly PENDING_PREFIX = 'pend_';
    readonly COLLECTED_PREFIX = 'collec_';
    readonly ESTIMATED_PREFIX = 'estim_';
    readonly TOTAL_PREFIX = 'tot_';
    readonly WALLET_PREFIX = 'wall_';

    constructor(props: any) {
        super(props);

        this.state = {
            interval: HOUR,
            userDividendInfo: UserDividendsInfo,
            totalRewards: Number,
            userEstimatedRewards: Number,
            treasuryInfo: ProjectWalletInfo,
            marketingInfo: ProjectWalletInfo,
            foundationInfo: ProjectWalletInfo,
            teamTimelockInfo: ProjectWalletInfo
        };
    }

    async componentDidMount() {
        let userInfo;
        let estimatedRewards = 0;

        if (this.props.account) {
            userInfo = await getUserDividendsInfo(this.props.account);
            estimatedRewards = await getEstimatedRewards(this.props.account);
        }

        const totalRewards = await getTotalRewards();
        const treasuryInfo = await getTreasuryWalletInfo();
        const marketingInfo = await getMarketingWalletInfo();
        const foundationInfo = await getFoundationWalletInfo();
        const teamTimelockInfo = await getTeamTimelockWalletInfo();

        this.setState({
            userDividendInfo: userInfo,
            totalRewards: totalRewards,
            estimatedRewards: estimatedRewards,
            treasuryInfo: treasuryInfo,
            marketingInfo: marketingInfo,
            foundationInfo: foundationInfo,
            teamTimelockInfo: teamTimelockInfo
        });
    }

    componentWillUnmount() {
        this.setState = (state,callback) => {
            return;
        };
    }

    async handleDurationChange(value: number) {
        // @ts-ignore
        if (this.props.account) {
            this.setState({
                interval: value,
                // @ts-ignore
                estimatedRewards: await getEstimatedRewards(this.props.account, value)
            });
        }
    }

    render() {
        let userInfo;

        if (this.state.userDividendInfo == null) {
            userInfo = new UserDividendsInfo('', 0, 0, 0, 0, 0, 0);
        } else {
            userInfo = this.state.userDividendInfo;
        }

        return (
            <StyledRewards className="content">
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <PendingRewardsBlock key={`${this.PENDING_PREFIX}${userInfo.address}`} info={userInfo}/>
                    </Grid>
                    <Grid item xs={4}>
                        <EstimatedRewardsBlock key={`${this.ESTIMATED_PREFIX}${userInfo.address}`}
                                               durationChanged={this.handleDurationChange.bind(this)}
                                               info={this.state.estimatedRewards}
                                               interval={this.state.interval}
                                               account={this.props.account}/>
                    </Grid>
                    <Grid item xs={4}>
                        <CollectedRewardsBlock key={`${this.COLLECTED_PREFIX}${userInfo.address}`} info={userInfo}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TotalRewardsBlock key={`${this.TOTAL_PREFIX}${userInfo.address}`}
                                           info={this.state.totalRewards}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectWalletBlock key={`${this.WALLET_PREFIX}treasury`}
                                            info={this.state.treasuryInfo} title="Treasury"/>
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectWalletBlock key={`${this.WALLET_PREFIX}marketing`}
                                            info={this.state.marketingInfo} title="Marketing"/>
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectWalletBlock key={`${this.WALLET_PREFIX}foundation`}
                                            info={this.state.foundationInfo} title="Foundation"/>
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectWalletBlock key={`${this.WALLET_PREFIX}teamTimelock`}
                                            info={this.state.teamTimelockInfo} title="Team timelock"/>
                    </Grid>
                </Grid>
            </StyledRewards>
        );
    }
}

const StyledRewards = styled.div<HTMLAttributes<HTMLDivElement>>`
  background-color: ${({theme}) => theme.colors.secondary};
`;

export default Rewards;
