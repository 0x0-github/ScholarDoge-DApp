import React from 'react';
import './WalletOwnerBlock.css';
import {useTranslation} from "react-i18next";
import {AccountCircle, Input, List} from "@material-ui/icons";
import {Link} from "../../shared/Link";
import useProjectWalletModal from "../useProjectWalletModal";

function WalletOwnerBlock(props: any) {
    const {t} = useTranslation('common');
    const {onPresentOwnerListModal, onPresentTransactionListModal}
        = useProjectWalletModal(props.owners, props.transactions, props.type);

    return (
        <div className="content">
            <Link onClick={() => onPresentTransactionListModal()}>
                <List className={"tx-list-img"}/>
            </Link>
            <Link onClick={() => onPresentOwnerListModal()}>
                <AccountCircle className={"owner-list-img"}/>
            </Link>
            <Link>
                <Input className={"new-tx-img"}/>
            </Link>
        </div>
    );
}

export default WalletOwnerBlock;

