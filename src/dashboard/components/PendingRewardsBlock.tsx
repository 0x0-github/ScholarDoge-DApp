import React from 'react';
import './PendingRewardsBlock.css';
import {Card} from "../../shared/Card";
import {useTranslation} from "react-i18next";

function PendingRewardsBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card>
            <div>
                <p className="pending-rewards">
                    {t('dashboard.pending_rewards.pending', {pending: props.withdrawableDividends})}
                </p>
                <p className="last-claim-block">
                    {t('dashboard.pending_rewards.last_claim', {last: props.lastClaimTime})}
                </p>
                <p className="next-claim-block">
                    {t('dashboard.pending_rewards.next_claim', {next: props.nextClaimTime})}
                </p>
            </div>
        </Card>
    );
}

export default PendingRewardsBlock;
