import React from 'react';
import './PendingRewardsBlock.css';
import {Card} from "../../shared/Card";
import {useTranslation} from "react-i18next";
import {Button} from "../../shared/Button";
import {timestampToFormattedDate} from "../../utils/formatTime";
import {numberToDecimalStr} from "../../utils/formatDecimal";
import useClaim from "../../hooks/useClaim";
import {H2} from "../../shared/H2";

function PendingRewardsBlock(props: any) {
    const {t} = useTranslation('common');
    const lastClaim = timestampToFormattedDate(props.info.lastClaimTime);
    const nextClaim = timestampToFormattedDate(props.info.nextClaimTime);
    const {onClaim} = useClaim();
    const handleClaim = async () => {
        await onClaim();
    }
    return (
        <Card className="card">
            <H2>{t('rewards.pending_rewards.title')}</H2>
            <div className="card-content">
                <p className="pending-rewards">
                    {t('rewards.pending_rewards.pending', {
                        pending: props.info.withdrawableDividends ?
                            numberToDecimalStr(props.info.withdrawableDividends) : 0
                    })}
                </p>
                <p className="last-claim-block">
                    {t('rewards.pending_rewards.last_claim', {
                        last: lastClaim
                    })}
                </p>
                <p className="next-claim-block">
                    {t('rewards.pending_rewards.next_claim', {
                        next: nextClaim
                    })}
                </p>
                <Button variant={'secondary'} scale="sm" onClick={() => {
                    handleClaim()
                }}>
                    {t('rewards.pending_rewards.claim')}
                </Button>
            </div>
        </Card>
    );
}

export default PendingRewardsBlock;
