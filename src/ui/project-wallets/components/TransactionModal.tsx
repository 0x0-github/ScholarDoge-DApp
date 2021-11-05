import React from "react";
import {useTranslation} from "react-i18next";
import {Modal} from "../../shared/widgets/Modal";
import useTheme from "../../../hooks/useTheme";
import {MultisigTransactionInfo} from "../../../models/MultisigTransactionInfo";

function TransactionModal(props: {transactions: MultisigTransactionInfo[], onDismiss?: () => null}) {
    const {t} = useTranslation('common');
    const {isDark} = useTheme();

    return (
        <Modal title={t('project_wallets.send_transaction_modal.title')} onDismiss={props.onDismiss}>
            <fieldset>

            </fieldset>
        </Modal>
    );
}

export default TransactionModal;
