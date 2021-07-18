import React from 'react';
import './PendingRewardsBlock.css';
import {Card} from "../../shared/Card";
import {useTranslation} from "react-i18next";
import {Button} from "../../shared/Button";
import {timestampToFormattedDate} from "../../utils/formatTime";

function PendingRewardsBlock(props: any) {
    const {t} = useTranslation('common');
    const lastClaim = (props.info.lastClaimTime != null && props.info.lastClaimTime != 0) ?
        timestampToFormattedDate(props.lastClaimTime) : '-';
    const nextClaim = (props.info.nextClaim != null && props.info.nextClaim != 0) ?
        timestampToFormattedDate(props.nextClaim) : '-';

    return (
        <Card className="card">
            <h2>{t('dashboard.pending_rewards.title')}</h2>
            <div>
                <p className="pending-rewards">
                    {t('dashboard.pending_rewards.pending', {pending: props.withdrawableDividends ?
                            props.info.withdrawableDividends : 0})}
                </p>
                <p className="last-claim-block">
                    {t('dashboard.pending_rewards.last_claim', {
                        last: lastClaim})}
                </p>
                <p className="next-claim-block">
                    {t('dashboard.pending_rewards.next_claim', {
                        next: nextClaim})}
                </p>
                <Button variant={'tertiary'} scale="sm" onClick={() => console.log('withdraw')}>
                    {t('dashboard.pending_rewards.withdraw')}
                </Button>
            </div>
        </Card>
    );
}

export default PendingRewardsBlock;
