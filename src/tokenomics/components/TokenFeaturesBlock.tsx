import React from 'react';
import './TokenFeaturesBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {H2} from "../../shared/H2";

function TokenFeaturesBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card className="card">
            <H2>{t('tokenomics.token_features.title')}</H2>
            <div className="card-content">
                <p>
                    {t('tokenomics.token_features.rewards', {value: props.info.rewardFees ?
                            props.info.rewardFees : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_features.lp', {value: props.info.lpFees ?
                            props.info.lpFees : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_features.treasury', {value: props.info.treasuryFees ?
                            props.info.treasuryFees : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_features.burn', {value: props.info.burnFees ?
                            props.info.burnFees : 0
                    })}
                </p>
                {
                    props.info.safeLaunchOn ? (
                        <div>
                            <p>
                                {t('tokenomics.token_features.safe_launch_on')}
                            </p>
                            <p className={"text-caption"}>
                                {t('tokenomics.token_features.safe_launch_caption')}
                            </p>
                            <p>
                                {t('tokenomics.token_features.safe_launch_sell_limit_interval')}
                            </p>
                            <p>
                                {t('tokenomics.token_features.safe_launch_tax_percentage')}
                            </p>
                            <p className={"text-caption"}>
                                {t('tokenomics.token_features.safe_launch_tax_percentage_caption')}
                            </p>
                            <p>
                                {t('tokenomics.token_features.safe_launch_tax_gwei_limit')}
                            </p>
                            <p className={"text-caption"}>
                                {t('tokenomics.token_features.safe_launch_tax_gwei_limit_caption')}
                            </p>
                            <p>
                                {t('tokenomics.token_features.safe_launch_revert_gwei_limit')}
                            </p>
                            <p className={"text-caption"}>
                                {t('tokenomics.token_features.safe_launch_revert_gwei_limit_caption')}
                            </p>
                        </div>
                    ) : (
                        <p>
                            {t('tokenomics.token_features.safe_launch_off')}
                        </p>
                    )
                }
            </div>
        </Card>
    );
}

export default TokenFeaturesBlock;
