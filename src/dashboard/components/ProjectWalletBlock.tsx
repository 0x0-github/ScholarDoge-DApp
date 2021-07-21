import React from 'react';
import './ProjectWalletBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {numberToDecimalStr} from "../../utils/formatDecimal";
import urls from "../../config/constants/urls";
import chains from "../../config/constants/chains";
import {Link} from "../../shared/Link";
import {H2} from "../../shared/H2";

function ProjectWalletBlock(props: any) {
    const {t} = useTranslation('common');
    const chainId = (process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
        : chains.mainnet.toString();

    return (
        <Card className="card">
            <H2>{t('dashboard.project_wallet.title', {wallet: props.title})}</H2>
            <div className="card-content">
                {
                    props.info.dividendsInfo ?
                        (
                            <p>
                                <Link href={
                                    // @ts-ignore
                                    `${urls.baseBscScanURL[chainId]}/address/${props.info.dividendsInfo.account}`}>
                                    {t('dashboard.project_wallet.address', {
                                        address: props.info.dividendsInfo.account
                                    })}
                                </Link>
                            </p>
                        ) :
                        (
                            <p>
                                {t('dashboard.project_wallet.address', {
                                    address: '-'
                                })}
                            </p>
                        )
                }

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

