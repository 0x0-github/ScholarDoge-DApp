import React, {Component, HTMLAttributes} from 'react';
import './Tokenomics.css';
import {getTokenConstraints, getTokenDependenciesInfo, getTokenFeatures, getTokenStats} from "../utils/callHelpers";
import {Grid} from "@material-ui/core";
import styled from "styled-components";
import {TokenFeaturesInfo} from "../models/TokenFeaturesInfo";
import {TokenStatsInfo} from "../models/TokenStatsInfo";
import {TokenConstraintsInfo} from "../models/TokenConstraintsInfo";
import {TokenDependenciesInfo} from "../models/TokenDependenciesInfo";
import TokenFeaturesBlock from "./components/TokenFeaturesBlock";
import TokenStatsBlock from "./components/TokenStatsBlock";
import TokenConstraintsBlock from "./components/TokenConstraintsBlock";
import TokenDependenciesBlock from "./components/TokenDependenciesBlock";
import {Spinner} from "../shared/Spinner";

class Tokenomics extends Component<any, any> {
    readonly FEATURES_PREFIX = 'feat_';
    readonly STATS_PREFIX = 'stat_';
    readonly CONSTRAINTS_PREFIX = 'constr_';
    readonly DEPENDENCIES_PREFIX = 'dep_';

    constructor(props: any) {
        super(props);

        this.state = {
            tokenFeatures: TokenFeaturesInfo,
            tokenStats: TokenStatsInfo,
            tokenConstraints: TokenConstraintsInfo,
            tokenDependencies: TokenDependenciesInfo,
            loading: true
        };
    }

    async componentDidMount() {
        const tokenFeatures = await getTokenFeatures();
        const tokenStats = await getTokenStats();
        const tokenConstraints = await getTokenConstraints();
        const tokenDependencies = await getTokenDependenciesInfo();

        this.setState({
            tokenFeatures: tokenFeatures,
            tokenStats: tokenStats,
            tokenConstraints: tokenConstraints,
            tokenDependencies: tokenDependencies,
            loading: false
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        let content;

        this.state.loading ?
            content = <Spinner/>
            :
            content = <Grid container spacing={1}>
                <Grid item xs={6}>
                    <TokenFeaturesBlock key={`${this.FEATURES_PREFIX}${this.props.account}`}
                                        info={this.state.tokenFeatures}/>
                </Grid>
                <Grid item xs={6}>
                    <TokenStatsBlock key={`${this.STATS_PREFIX}${this.props.account}`}
                                     info={this.state.tokenStats}/>
                </Grid>
                <Grid item xs={6}>
                    <TokenConstraintsBlock key={`${this.CONSTRAINTS_PREFIX}${this.props.account}`}
                                           info={this.state.tokenConstraints}/>
                </Grid>
                <Grid item xs={6}>
                    <TokenDependenciesBlock key={`${this.DEPENDENCIES_PREFIX}${this.props.account}`}
                                            info={this.state.tokenDependencies}/>
                </Grid>
            </Grid>

        return (
            <StyledTokenomics className="content">
                {content}
            </StyledTokenomics>
        );
    }
}

const StyledTokenomics = styled.div<HTMLAttributes<HTMLDivElement>>`
  background-color: ${({theme}) => theme.colors.secondary};
`;

export default Tokenomics;
