import React from 'react';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {numberToDecimalStr} from "../../utils/formatDecimal";
import {H2} from "../../shared/H2";

function TotalRewardsBlock(props: any) {
    const {t} = useTranslation('common');
    return (
        <Card className="card">
            <H2>{t('dashboard.total_rewards.title')}</H2>
            <div className="card-content">
                <p className="total-rewards">
                    {t('dashboard.total_rewards.total', {
                        total: props.info ?
                            numberToDecimalStr(props.info) : 0
                    })}
                </p>
            </div>
        </Card>
    );
}

export default TotalRewardsBlock;
