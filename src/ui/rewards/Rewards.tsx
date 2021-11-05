import React, {Component, HTMLAttributes} from 'react';
import './Rewards.css';
import {
    getCurrentRewardToken,
    getEstimatedRewards,
    getRewardTokens,
    getScholarDogeBalance,
    getToken,
    getTotalRewards,
    getUserDividendsInfo
} from "../../utils/callHelpers";
import PendingRewardsBlock from "./components/PendingRewardsBlock";
import {UserDividendsInfo} from "../../models/UserDividendsInfo";
import CollectedRewardsBlock from "./components/CollectedRewardsBlock";
import {Grid} from "@material-ui/core";
import EstimatedRewardsBlock, {HOUR, MID_VOL} from "./components/EstimatedRewardsBlock";
import TotalRewardsBlock from "./components/TotalRewardsBlock";
import {Spinner} from "../shared/Spinner";
import styled from "styled-components";
import RewardTokensBlock from "./components/RewardTokensBlock";
import {RewardTokenInfo} from "../../models/RewardTokenInfo";
import {getRewardToken, setRewardToken} from "../../utils/sessionStorageUtils";

class Rewards extends Component<any, any> {
    readonly REWARD_TOKENS_PREFIX = 'rewtkn_';
    readonly PENDING_PREFIX = 'pend_';
    readonly COLLECTED_PREFIX = 'collec_';
    readonly ESTIMATED_PREFIX = 'estim_';
    readonly TOTAL_PREFIX = 'tot_';

    constructor(props: any) {
        super(props);

        this.state = {
            interval: HOUR,
            dailyVolume: MID_VOL,
            userDividendInfo: null,
            totalRewards: Number,
            userBalance: Number,
            estimatedRewards: Number,
            currentRewardToken: null,
            displayedRewardToken: null,
            rewardTokens: [],
            loading: true
        };
    }

    async componentDidMount() {
        let userInfo;
        let estimatedRewards = 0;
        let userBalance = 0;

        const currentRewardToken = await getCurrentRewardToken();
        let storedRewardToken = getRewardToken();

        if (storedRewardToken == null) {
            setRewardToken(currentRewardToken);

            storedRewardToken = currentRewardToken;
        }

        this.setState({
            currentRewardToken: currentRewardToken,
            displayedRewardToken: storedRewardToken
        });

        if (this.props.account) {
            userInfo = await getUserDividendsInfo(this.props.account,
                storedRewardToken.address);
            estimatedRewards = await getEstimatedRewards(this.props.account,
                storedRewardToken.address);
            userBalance = await getScholarDogeBalance(this.props.account);
        }

        const totalRewards = await getTotalRewards(storedRewardToken.address);
        const rewardTokens = await getRewardTokens();

        this.setState({
            userDividendInfo: userInfo,
            totalRewards: totalRewards,
            userBalance: userBalance,
            estimatedRewards: estimatedRewards,
            rewardTokens: rewardTokens,
            loading: false
        });
    }

    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }

    async handleDurationChange(value: number) {
        if (this.props.account) {
            this.setState({
                interval: value,
                // @ts-ignore
                estimatedRewards: await getEstimatedRewards(this.props.account,
                    this.state.displayedRewardToken.address, this.state.dailyVolume, value)
            });
        }
    }

    async handleVolumeChange(value: number) {
        if (this.props.account) {
            this.setState({
                dailyVolume: value,
                // @ts-ignore
                estimatedRewards: await getEstimatedRewards(this.props.account,
                    this.state.displayedRewardToken.address, value, this.state.interval)
            });
        }
    }

    async handleRewardTokenChange(value: string) {
        const rewardToken = await getToken(value);

        this.setState({
            displayedRewardToken: rewardToken,
            userDividendInfo: await getUserDividendsInfo(this.props.account,
                rewardToken.address),
            estimatedRewards: await getEstimatedRewards(this.props.account,
                rewardToken.address, this.state.dailyVolume, this.state.interval),
            totalRewards: await getTotalRewards(rewardToken.address)
        });
        setRewardToken(rewardToken);
    }

    render() {
        let userInfo;
        let content;

        if (this.state.userDividendInfo == null) {
            userInfo = new UserDividendsInfo('', 0, 0, 0, 0, 0, 0);
        } else {
            userInfo = this.state.userDividendInfo;
        }

        const options = this.state.rewardTokens.map((elt: RewardTokenInfo) => {
            return {value: elt.address, label: elt.name + ' - ' + elt.symbol}
        });

        this.state.loading ?
            content = <Spinner/>
            :
            content = <Grid container spacing={1}>
                <Grid item xs={12} className={"reward-token-block"}>
                    <RewardTokensBlock key={`${this.REWARD_TOKENS_PREFIX}${userInfo.address}`}
                                       currentRewardToken={this.state.currentRewardToken}
                                       rewardTokenChanged={this.handleRewardTokenChange.bind(this)}
                                       rewardTokens={options}
                                       displayedRewardToken={this.state.displayedRewardToken}/>
                </Grid>
                <Grid item xs={6}>
                    <PendingRewardsBlock key={`${this.PENDING_PREFIX}${userInfo.address}`}
                                         currentRewardToken={this.state.displayedRewardToken}
                                         info={userInfo}/>
                </Grid>
                <Grid item xs={6}>
                    <CollectedRewardsBlock key={`${this.COLLECTED_PREFIX}${userInfo.address}`}
                                           currentRewardToken={this.state.displayedRewardToken}
                                           info={userInfo}/>
                </Grid>
                <Grid item xs={12}>
                    <EstimatedRewardsBlock key={`${this.ESTIMATED_PREFIX}${userInfo.address}`}
                                           durationChanged={this.handleDurationChange.bind(this)}
                                           volumeChanged={this.handleVolumeChange.bind(this)}
                                           info={{
                                               balance: this.state.userBalance,
                                               estimated: this.state.estimatedRewards
                                           }}
                                           currentRewardToken={this.state.displayedRewardToken}
                                           interval={this.state.interval}
                                           dailyVolume={this.state.dailyVolume}
                                           account={this.props.account}/>
                </Grid>
                <Grid item xs={12}>
                    <TotalRewardsBlock key={`${this.TOTAL_PREFIX}${userInfo.address}`}
                                       currentRewardToken={this.state.displayedRewardToken}
                                       info={this.state.totalRewards}/>
                </Grid>
            </Grid>;

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
