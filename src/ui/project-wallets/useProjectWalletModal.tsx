import React from "react";
import {MultisigTransactionInfo} from "../../models/MultisigTransactionInfo";
import TransactionListModal from "./components/TransactionListModal";
import {useModal} from "../shared/widgets/Modal";
import {MultisigOwnerInfo} from "../../models/MultisigOwnerInfo";
import OwnerListModal from "./components/OwnerListModal";
import {ProjectWalletType} from "./ProjectWallets";

interface ReturnType {
    onPresentTransactionListModal: () => void;
    onPresentOwnerListModal: () => void;
}

const useProjectWalletModal = (owners: MultisigOwnerInfo[], transactions: MultisigTransactionInfo[],
                               type: ProjectWalletType): ReturnType => {
    const [onPresentTransactionListModal] = useModal(<TransactionListModal transactions={transactions} type={type}/>);
    const [onPresentOwnerListModal] = useModal(<OwnerListModal owners={owners} type={type}/>);

    return {onPresentTransactionListModal, onPresentOwnerListModal};
};

export default useProjectWalletModal;
