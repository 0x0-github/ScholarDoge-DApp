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
            <H2>{t('rewards.estimated_rewards.title')}</H2>
            <div className="card-content">
                <p>
                    {t('rewards.estimated_rewards.balance', {
                        balance: props.info.balance ?
                            props.info.balance : 0
                    })}
                </p>
                <p className="estimated-rewards">
                    {t('rewards.estimated_rewards.estimated', {
                        estimated: props.info.estimated ?
                            numberToDecimalStr(props.info.estimated) : 0
                    })}
                </p>
                <div className="selectors">
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(HOUR)}
                            disabled={props.interval === HOUR}>
                        {t('rewards.estimated_rewards.hourly')}
                    </Button>
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(DAY)}
                            disabled={props.interval === DAY}>
                        {t('rewards.estimated_rewards.daily')}
                    </Button>
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(WEEK)}
                        disabled={props.interval === WEEK}>
                        {t('rewards.estimated_rewards.weekly')}
                    </Button>
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(MONTH)}
                            disabled={props.interval === MONTH}>
                        {t('rewards.estimated_rewards.monthly')}
                    </Button>
                    <Button variant="secondary" scale="sm" onClick={() => props.durationChanged(YEAR)}
                            disabled={props.interval === YEAR}>
                        {t('rewards.estimated_rewards.yearly')}
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default EstimatedRewardsBlock;
