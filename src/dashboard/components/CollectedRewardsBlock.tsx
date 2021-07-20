import React from 'react';
import './CollectedRewardsBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {numberToDecimalStr} from "../../utils/formatDecimal";

function CollectedRewardsBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card className="card">
            <h2>{t('dashboard.collected_rewards.title')}</h2>
            <div className="card-content">
                <p className="collected-rewards">
                    {t('dashboard.collected_rewards.collected', {
                        collected: props.info.totalDividends ?
                            numberToDecimalStr(props.info.totalDividends) : 0
                    })}
                </p>
            </div>
        </Card>
    );
}

export default CollectedRewardsBlock;
