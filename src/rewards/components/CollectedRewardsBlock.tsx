import React from 'react';
import './CollectedRewardsBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {numberToDecimalStr} from "../../utils/formatDecimal";
import {H2} from "../../shared/H2";

function CollectedRewardsBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card className="card">
            <H2>{t('rewards.collected_rewards.title')}</H2>
            <div className="card-content">
                <p className="collected-rewards">
                    {t('rewards.collected_rewards.collected', {
                        collected: props.info.totalDividends ?
                            numberToDecimalStr(props.info.totalDividends) : 0
                    })}
                </p>
            </div>
        </Card>
    );
}

export default CollectedRewardsBlock;
