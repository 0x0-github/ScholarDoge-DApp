import React from 'react';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {numberToDecimalStr} from "../../../utils/formatDecimal";
import urls from "../../../config/constants/urls";
import chains from "../../../config/constants/chains";
import {Link} from "../../shared/Link";
import {H2} from "../../shared/H2";
import WalletOwnerBlock from "./WalletOwnerBlock";
import {MultisigOwnerInfo} from "../../../models/MultisigOwnerInfo";
import {ProjectWalletType} from "../ProjectWallets";

function ProjectWalletBlock(props: any) {
    const {t} = useTranslation('common');
    const chainId = (process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
        : chains.mainnet.toString();
    let ownerBlock;
    let title;

    switch (props.type) {
        case ProjectWalletType.TREASURY:
            title = t('project_wallets.project_wallet.treasury');

            break;
        case ProjectWalletType.MARKETING:
            title = t('project_wallets.project_wallet.marketing');

            break;
        case ProjectWalletType.FOUNDATION:
            title = t('project_wallets.project_wallet.foundation');

            break;
        case ProjectWalletType.TIMELOCK:
            title = t('project_wallets.project_wallet.timelock');

            break;
    }

    if (props.owners && props.owners.filter((elt: MultisigOwnerInfo) => elt.address === props.account).length > 0) {
        ownerBlock = <WalletOwnerBlock owners={props.owners} transactions={props.transactions} type={props.type}/>
    }

    return (
        <Card className="card">
            <H2>{title}</H2>
            <div className="card-content">
                {
                    props.info.dividendsInfo ?
                        (
                            <p>
                                <Link href={
                                    // @ts-ignore
                                    `${urls.baseBscScanURL[chainId]}/address/${props.info.dividendsInfo.account}`}>
                                    {t('project_wallets.project_wallet.address', {
                                        address: props.info.dividendsInfo.account
                                    })}
                                </Link>
                            </p>
                        ) :
                        (
                            <p>
                                {t('project_wallets..project_wallet.address', {
                                    address: '-'
                                })}
                            </p>
                        )
                }

                <p>
                    {t('project_wallets.project_wallet.amount_bnb', {
                        amount: props.info.holdingBNB ?
                            numberToDecimalStr(props.info.holdingBNB) : 0
                    })}
                </p>
                <p>
                    {t('project_wallets.project_wallet.amount_sdoge', {
                        amount: props.info.holdingSDOGE ?
                            numberToDecimalStr(props.info.holdingSDOGE, 0) : 0
                    })}
                </p>
                {ownerBlock}
            </div>
        </Card>
    );
}

export default ProjectWalletBlock;

