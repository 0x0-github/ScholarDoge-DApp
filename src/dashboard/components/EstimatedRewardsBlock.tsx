import React from 'react';
import './EstimatedRewardsBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {numberToDecimalStr} from "../../utils/formatDecimal";
import {Button} from "../../shared/Button";
import {H2} from "../../shared/H2";

export const HOUR = 3600;
export const DAY = 86400;
export const WEEK = 604800;
export const MONTH = 2592000;
export const YEAR = 31536000;

function EstimatedRewardsBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card className="card">
            <H2>{t('dashboard.estimated_rewards.title')}</H2>
            <div className="card-content">
                <p className="estimated-rewards">
                    {t('dashboard.estimated_rewards.estimated', {
                        estimated: props.info ?
                            numberToDecimalStr(props.info) : 0
                    })}
                </p>
                <div className="selectors">
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(HOUR)}
                            disabled={props.interval === HOUR}>
                        {t('dashboard.estimated_rewards.hourly')}
                    </Button>
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(DAY)}
                            disabled={props.interval === DAY}>
                        {t('dashboard.estimated_rewards.daily')}
                    </Button>
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(WEEK)}
                        disabled={props.interval === WEEK}>
                        {t('dashboard.estimated_rewards.weekly')}
                    </Button>
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(MONTH)}
                            disabled={props.interval === MONTH}>
                        {t('dashboard.estimated_rewards.monthly')}
                    </Button>
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(YEAR)}
                            disabled={props.interval === YEAR}>
                        {t('dashboard.estimated_rewards.yearly')}
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default EstimatedRewardsBlock;
