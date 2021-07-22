import React from 'react';
import './TokenConstraintsBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {H2} from "../../shared/H2";

function TokenFeaturesBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card className="card">
            <H2>{t('tokenomics.token_constraints.title')}</H2>
            <div className="card-content">
                <p>
                    {t('tokenomics.token_constraints.max_hold', {value:  props.info.maxHold ?
                            props.info.maxHold : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_constraints.max_sell_tx', {value:  props.info.maxSellTx ?
                            props.info.maxSellTx : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_constraints.claim_time_h', {value:  props.info.claimTime ?
                            props.info.claimTime : 0
                    })}
                </p>
            </div>
        </Card>
    );
}

export default TokenFeaturesBlock;
