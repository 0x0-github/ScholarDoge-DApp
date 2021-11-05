import React from 'react';
import './TokenStatsBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {H2} from "../../shared/H2";

function TokenStatsBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card className="card">
            <H2>{t('tokenomics.token_stats.title')}</H2>
            <div className="card-content">
                <p>
                    {t('tokenomics.token_stats.total_supply', {value:  props.info.supply ?
                            props.info.supply : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_stats.burned', {value:  props.info.burned ?
                            props.info.burned : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_stats.added_bnb_lp', {value:  props.info.bnbLpAdded ?
                            props.info.bnbLpAdded : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_stats.added_sdoge_lp', {value:  props.info.sdogeLpAdded ?
                            props.info.sdogeLpAdded : 0
                    })}
                </p>
                <p>
                    {t('tokenomics.token_stats.collected', {value:  props.info.collected ?
                            props.info.collected : 0
                    })}
                </p>
            </div>
        </Card>
    );
}

export default TokenStatsBlock;
