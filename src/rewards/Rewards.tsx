import React, {Component, HTMLAttributes} from 'react';
import './Rewards.css';
import {
    getEstimatedRewards,
    getFoundationWalletInfo,
    getMarketingWalletInfo,
    getScholarDogeBalance,
    getTeamTimelockWalletInfo,
    getTotalRewards,
    getTreasuryWalletInfo,
    getUserDividendsInfo
} from "../utils/callHelpers";
import PendingRewardsBlock from "./components/PendingRewardsBlock";
import {UserDividendsInfo} from "../models/UserDividendsInfo";
import {ProjectWalletInfo} from "../models/ProjectWalletInfo";
import CollectedRewardsBlock from "./components/CollectedRewardsBlock";
import {Grid} from "@material-ui/core";
import EstimatedRewardsBlock, {HOUR, MID_VOL} from "./components/EstimatedRewardsBlock";
import TotalRewardsBlock from "./components/TotalRewardsBlock";
import ProjectWalletBlock from "./components/ProjectWalletBlock";
import {Spinner} from "../shared/Spinner";
import styled from "styled-components";
import contracts from "../config/constants/contracts";
import chains from "../config/constants/chains";

const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
    : chains.mainnet.toString(), 10);

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
            dailyVolume: MID_VOL,
            userDividendInfo: UserDividendsInfo,
            totalRewards: Number,
            userBalance: Number,
            userEstimatedRewards: Number,
            treasuryInfo: ProjectWalletInfo,
            marketingInfo: ProjectWalletInfo,
            foundationInfo: ProjectWalletInfo,
            teamTimelockInfo: ProjectWalletInfo,
            loading: true
        };
    }

    async componentDidMount() {
        let userInfo;
        let estimatedRewards = 0;
        let userBalance = 0;

        if (this.props.account) {
            userInfo = await getUserDividendsInfo(this.props.account);
            estimatedRewards = await getEstimatedRewards(this.props.account);
            userBalance = await getScholarDogeBalance(this.props.account);
        }

        const totalRewards = await getTotalRewards();
        const treasuryInfo = await getTreasuryWalletInfo();
        const marketingInfo = await getMarketingWalletInfo();
        const foundationInfo = await getFoundationWalletInfo();
        const teamTimelockInfo = await getTeamTimelockWalletInfo();

        this.setState({
            userDividendInfo: userInfo,
            totalRewards: totalRewards,
            userBalance: userBalance,
            estimatedRewards: estimatedRewards,
            treasuryInfo: treasuryInfo,
            marketingInfo: marketingInfo,
            foundationInfo: foundationInfo,
            teamTimelockInfo: teamTimelockInfo,
            loading: false
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    async handleDurationChange(value: number) {
        // @ts-ignore
        if (this.props.account) {
            this.setState({
                interval: value,
                // @ts-ignore
                estimatedRewards: await getEstimatedRewards(this.props.account, contracts.wbnb[chainId],
                    this.state.dailyVolume, value)
            });
        }
    }

    async handleVolumeChange(value: number) {
        // @ts-ignore
        if (this.props.account) {
            this.setState({
                dailyVolume: value,
                // @ts-ignore
                estimatedRewards: await getEstimatedRewards(this.props.account, contracts.wbnb[chainId],
                    value, this.state.interval)
            });
        }
    }

    render() {
        let userInfo;
        let content;

        if (this.state.userDividendInfo == null) {
            userInfo = new UserDividendsInfo('', 0, 0, 0, 0, 0, 0);
        } else {
            userInfo = this.state.userDividendInfo;
        }

        this.state.loading ?
            content = <Spinner/>
            :
            content = <Grid container spacing={1}>
                <Grid item xs={4}>
                    <PendingRewardsBlock key={`${this.PENDING_PREFIX}${userInfo.address}`} info={userInfo}/>
                </Grid>
                <Grid item xs={4}>
                    <EstimatedRewardsBlock key={`${this.ESTIMATED_PREFIX}${userInfo.address}`}
                                           durationChanged={this.handleDurationChange.bind(this)}
                                           volumeChanged={this.handleVolumeChange.bind(this)}
                                           info={{
                                               balance: this.state.userBalance,
                                               estimated: this.state.estimatedRewards
                                           }}
                                           interval={this.state.interval}
                                           dailyVolume={this.state.dailyVolume}
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

        return (
            <StyledRewards className="content">
                {content}
            </StyledRewards>
        );
    }
}

const StyledRewards = styled.div<HTMLAttributes<HTMLDivElement>>`
  background-color: ${({theme}) => theme.colors.secondary};
`;

export default Rewards;
