import React, {Component, HTMLAttributes} from 'react';
import './ProjectWallets.css';
import {
    getFoundationOwners, getFoundationTransactions,
    getFoundationWalletInfo, getMarketingOwners, getMarketingTransactions,
    getMarketingWalletInfo,
    getTeamTimelockWalletInfo, getTreasuryOwners, getTreasuryTransactions,
    getTreasuryWalletInfo,
} from "../../utils/callHelpers";
import {Grid} from "@material-ui/core";
import {Spinner} from "../shared/Spinner";
import styled from "styled-components";
import ProjectWalletBlock from "./components/ProjectWalletBlock";

export const enum ProjectWalletType {
    TREASURY,
    MARKETING,
    FOUNDATION,
    TIMELOCK,
}

class ProjectWallets extends Component<any, any> {
    readonly WALLET_PREFIX = 'wall_';

    constructor(props: any) {
        super(props);

        this.state = {
            treasuryInfo: null,
            marketingInfo: null,
            foundationInfo: null,
            teamTimelockInfo: null,
            treasuryOwners: null,
            marketingOwners: false,
            foundationOwners: false,
            treasuryTxs: null,
            marketingTxs: null,
            foundationTxs: null,
            loading: true
        };
    }

    async componentDidMount() {
        const treasuryInfo = await getTreasuryWalletInfo();
        const marketingInfo = await getMarketingWalletInfo();
        const foundationInfo = await getFoundationWalletInfo();
        const teamTimelockInfo = await getTeamTimelockWalletInfo();
        const treasuryOwners = await getTreasuryOwners();
        const marketingOwners = await getMarketingOwners();
        const foundationOwners = await getFoundationOwners();

        if (treasuryOwners.filter(elt => elt.address === this.props.account).length > 0) {
            this.setState({
                treasuryOwners: treasuryOwners,
                treasuryTxs: await getTreasuryTransactions()
            });
        }

        if (marketingOwners.filter(elt => elt.address === this.props.account).length > 0) {
            this.setState({
                marketingOwners: marketingOwners,
                marketingTxs: await getMarketingTransactions()
            });
        }

        if (foundationOwners.filter(elt => elt.address === this.props.account).length > 0) {
            this.setState({
                foundationOwners: foundationOwners,
                foundationTxs: await getFoundationTransactions()
            });
        }

        this.setState({
            treasuryInfo: treasuryInfo,
            marketingInfo: marketingInfo,
            foundationInfo: foundationInfo,
            teamTimelockInfo: teamTimelockInfo,
            loading: false
        });
    }

    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }

    render() {
        let content;

        this.state.loading ?
            content = <Spinner/>
            :
            content = <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ProjectWalletBlock key={`${this.WALLET_PREFIX}treasury`}
                                        info={this.state.treasuryInfo}
                                        account={this.props.account}
                                        type={ProjectWalletType.TREASURY}
                                        owners={this.state.treasuryOwners}
                                        transactions={this.state.treasuryTxs}/>
                </Grid>
                <Grid item xs={12}>
                    <ProjectWalletBlock key={`${this.WALLET_PREFIX}marketing`}
                                        info={this.state.marketingInfo}
                                        account={this.props.account}
                                        type={ProjectWalletType.MARKETING}
                                        owners={this.state.marketingOwners}
                                        transactions={this.state.marketingTxs}/>
                </Grid>
                <Grid item xs={12}>
                    <ProjectWalletBlock key={`${this.WALLET_PREFIX}foundation`}
                                        info={this.state.foundationInfo}
                                        account={this.props.account}
                                        type={ProjectWalletType.FOUNDATION}
                                        owners={this.state.foundationOwners}
                                        transactions={this.state.foundationTxs}/>
                </Grid>
                <Grid item xs={12}>
                    <ProjectWalletBlock key={`${this.WALLET_PREFIX}teamTimelock`}
                                        info={this.state.teamTimelockInfo}
                                        type={ProjectWalletType.TIMELOCK}/>
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

export default ProjectWallets;
