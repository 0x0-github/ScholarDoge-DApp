import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Modal} from "../../shared/widgets/Modal";
import {Table} from "react-bootstrap";
import useTheme from "../../../hooks/useTheme";
import {MultisigOwnerInfo} from "../../../models/MultisigOwnerInfo";
import {Remove} from "@material-ui/icons";
import {ProjectWalletType} from "../ProjectWallets";
import useTreasurySubmitOwnerTx from "../../../hooks/useTreasurySubmitOwnerTx";
import useMarketingSubmitOwnerTx from "../../../hooks/useMarketingSubmitOwnerTx";
import useFoundationSubmitOwnerTx from "../../../hooks/useFoundationSubmitOwnerTx";
import {useWeb3React} from "@web3-react/core";
import {useScholarDogeFoundation, useScholarDogeMarketing, useScholarDogeTreasury} from "../../../hooks/useContract";
import useWeb3 from "../../../hooks/useWeb3";

function OwnerListModal(props: {owners: MultisigOwnerInfo[], type: ProjectWalletType, onDismiss?: () => null}) {
    const {t} = useTranslation('common');
    const {isDark} = useTheme();
    const {account} = useWeb3React();
    const tableRows = [];
    const foundation = useScholarDogeFoundation();
    const marketing = useScholarDogeMarketing();
    const treasury = useScholarDogeTreasury();

    // TODO: See result callback
    const handleRevokeUserClick = async (addr: string) => {
        switch (props.type) {
            case ProjectWalletType.TREASURY:
                treasury.methods.submitOwnerTx(addr).send({from: account, gas: 100000}).then((result: any) => {
                        console.log(result);
                });

                break;
            case ProjectWalletType.MARKETING:
                    marketing.methods.submitOwnerTx(addr).send({from: account, gas: 100000}).then((result: any) => {
                        console.log(result);
                    });

                break;
            case ProjectWalletType.FOUNDATION:
                    foundation.methods.submitOwnerTx(addr).send({from: account, gas: 100000}).then((result: any) => {
                        console.log(result);
                    });

                break;
    }
};

    for (let tx of props.owners) {
        tableRows.push(<tr>
            <td>{tx.index}</td>
            <td>{tx.address}</td>
            <td onClick={() => handleRevokeUserClick(tx.address)}><Remove style={{cursor: 'pointer'}}/></td>
        </tr>);
    }

    return (
        <Modal title={t('project_wallets.owner_modal.title')} onDismiss={props.onDismiss}>
            <Table striped bordered variant={isDark ? "dark" : "light"}>
                <thead>
                    <tr>
                        <th>{t('project_wallets.owner_modal.index')}</th>
                        <th>{t('project_wallets.owner_modal.address')}</th>
                        <th>{t('project_wallets.owner_modal.actions')}</th>
                    </tr>
                    </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
        </Modal>
    );
}

export default OwnerListModal;
