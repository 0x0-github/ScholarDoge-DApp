import React from 'react';
import './ProjectWalletBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {numberToDecimalStr} from "../../utils/formatDecimal";

function ProjectWalletBlock(props: any) {
    const {t} = useTranslation('common');

    return (
        <Card className="card">
            <h2>{t('dashboard.project_wallet.title', {wallet: props.title})}</h2>
            <div className="card-content">
                <p>
                    {t('dashboard.project_wallet.address', {
                        address: props.info.dividendsInfo ? props.info.dividendsInfo.account : '-'
                    })}
                </p>
                <p>
                    {t('dashboard.project_wallet.amount_bnb', {
                        amount: props.info.holdingBNB ?
                            numberToDecimalStr(props.info.holdingBNB) : 0
                    })}
                </p>
                <p>
                    {t('dashboard.project_wallet.amount_sdoge', {
                        amount: props.info.holdingSDOGE ?
                            numberToDecimalStr(props.info.holdingSDOGE, 0) : 0
                    })}
                </p>
            </div>
        </Card>
    );
}

export default ProjectWalletBlock;

