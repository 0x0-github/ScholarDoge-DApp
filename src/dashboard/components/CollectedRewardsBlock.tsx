import React from 'react';
import './CollectedRewardsBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {Button} from "../../shared/Button";
import {numberToTwoDecimals} from "../../utils/formatDecimal";

function CollectedRewardsBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card className="card">
            <h2>{t('dashboard.collected_rewards.title')}</h2>
            <div>
                <p className="collected-rewards">
                    {t('dashboard.collected_rewards.collected', {collected: props.info.totalDividends ?
                            numberToTwoDecimals(props.info.totalDividends) : 0})}
                </p>
                <Button variant={'tertiary'} scale="sm" onClick={() => console.log('history')} disabled>
                    {t('dashboard.collected_rewards.history')}
                </Button>
            </div>
        </Card>
    );
}

export default CollectedRewardsBlock;
