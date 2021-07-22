import React from 'react';
import './TokenDependenciesBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {H2} from "../../shared/H2";
import {Link} from "../../shared/Link";
import urls from "../../config/constants/urls";
import chains from "../../config/constants/chains";

function TokenDependenciesBlock(props: any) {
    const {t} = useTranslation('common');
    const chainId = (process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
        : chains.mainnet.toString();

    return (
        <Card className="card">
            <H2>{t('tokenomics.token_dependencies.title')}</H2>
            <div className="card-content">
                {
                    props.info.router ?
                        (
                            <p>
                                <Link href={
                                    // @ts-ignore
                                    `${urls.baseBscScanURL[chainId]}/address/${props.info.router}`}>
                                    {t('tokenomics.token_dependencies.router', {
                                        value: props.info.router
                                    })}
                                </Link>
                            </p>
                        ) :
                        (
                            <p>
                                {t('tokenomics.token_dependencies.router', {
                                    value: '-'
                                })}
                            </p>
                        )
                }
                {
                    props.info.pair ?
                        (
                            <p>
                                <Link href={
                                    // @ts-ignore
                                    `${urls.baseBscScanURL[chainId]}/address/${props.info.pair}`}>
                                    {t('tokenomics.token_dependencies.pair', {
                                        value: props.info.pair
                                    })}
                                </Link>
                            </p>
                        ) :
                        (
                            <p>
                                {t('tokenomics.token_dependencies.pair', {
                                    value: '-'
                                })}
                            </p>
                        )
                }
                {
                    props.info.dividendTracker ?
                        (
                            <p>
                                <Link href={
                                    // @ts-ignore
                                    `${urls.baseBscScanURL[chainId]}/address/${props.info.dividendTracker}`}>
                                    {t('tokenomics.token_dependencies.dividend_tracker', {
                                        value: props.info.dividendTracker
                                    })}
                                </Link>
                            </p>
                        ) :
                        (
                            <p>
                                {t('tokenomics.token_dependencies.dividendTracker', {
                                    value: '-'
                                })}
                            </p>
                        )
                }
            </div>
        </Card>
    );
}

export default TokenDependenciesBlock;
