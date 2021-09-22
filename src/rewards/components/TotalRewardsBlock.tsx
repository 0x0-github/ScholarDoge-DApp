import React from 'react';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {numberToDecimalStr} from "../../utils/formatDecimal";
import {H2} from "../../shared/H2";
import {Link} from "../../shared/Link";
import urls from "../../config/constants/urls";
import chains from "../../config/constants/chains";
import contracts from "../../config/constants/contracts";

function TotalRewardsBlock(props: any) {
    const {t} = useTranslation('common');
    const chainId = (process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
        : chains.mainnet.toString();

    return (
        <Card className="card">
            <H2>{t('rewards.total_rewards.title')}</H2>
            <div className="card-content">
                {
                    props.info.holders ?
                        (
                            <p>
                                <Link href={
                                    // @ts-ignore
                                    `${urls.baseBscScanURL[chainId]}/token/${contracts.scholarDogeToken[chainId]}#balances`}>
                                    {t('rewards.total_rewards.holders', {
                                        holders: props.info.holders
                                    })}
                                </Link>
                            </p>
                        ) :
                        (
                            <p>
                                {t('rewards.total_rewards.holders', {
                                    holders: '0'
                                })}
                            </p>
                        )
                }

                <p>
                    {t('rewards.total_rewards.total', {
                        total: props.info.total ?
                            numberToDecimalStr(props.info.total) : 0
                    })}
                </p>
            </div>
        </Card>
    );
}

export default TotalRewardsBlock;
