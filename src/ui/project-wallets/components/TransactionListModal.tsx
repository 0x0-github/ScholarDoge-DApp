import React from "react";
import {useTranslation} from "react-i18next";
import {Modal} from "../../shared/widgets/Modal";
import {Table} from "react-bootstrap";
import useTheme from "../../../hooks/useTheme";
import {MultisigTransactionInfo} from "../../../models/MultisigTransactionInfo";
import {ProjectWalletType} from "../ProjectWallets";

function TransactionListModal(props: {transactions: MultisigTransactionInfo[], type: ProjectWalletType, onDismiss?: () => null}) {
    const {t} = useTranslation('common');
    const {isDark} = useTheme();
    const tableRows = [];

    for (let tx of props.transactions) {
        tableRows.push(<tr>
            <td>{tx.index}</td>
            <td>{tx.to}</td>
            <td>{tx.value}</td>
            <td>{tx.type}</td>
            <td>{tx.confirmations}</td>
            <td>{tx.executed}</td>
        </tr>);
    }

    return (
        <Modal title={t('project_wallets.transaction_modal.title')} onDismiss={props.onDismiss}>
            <Table striped bordered variant={isDark ? "dark" : "light"}>
                <thead>
                    <tr>
                        <th>{t('project_wallets.transaction_modal.index')}</th>
                        <th>{t('project_wallets.transaction_modal.to')}</th>
                        <th>{t('project_wallets.transaction_modal.value')}</th>
                        <th>{t('project_wallets.transaction_modal.type')}</th>
                        <th>{t('project_wallets.transaction_modal.confirmations')}</th>
                        <th>{t('project_wallets.transaction_modal.executed')}</th>
                        <th>{t('project_wallets.transaction_modal.actions')}</th>
                    </tr>
                    </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
        </Modal>
    );
}

export default TransactionListModal;
