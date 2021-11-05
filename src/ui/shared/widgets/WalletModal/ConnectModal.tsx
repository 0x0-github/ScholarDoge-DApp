import React from "react";
import {Modal} from "../Modal";
import WalletCard from "./WalletCard";
import config from "./config";
import {Login} from "./types";
import {useTranslation} from "react-i18next";

interface Props {
    login: Login;
    onDismiss?: () => void;
}

const ConnectModal: React.FC<Props> = ({login, onDismiss = () => null}) => {
    const {t} = useTranslation('common');

    return (
        <Modal title={t('auth.connect_wallet')} onDismiss={onDismiss}>
            {config.map((entry, index) => (
                <WalletCard
                    key={entry.title}
                    login={login}
                    walletConfig={entry}
                    onDismiss={onDismiss}
                    mb={index < config.length - 1 ? "8px" : "0"}
                />
            ))}
        </Modal>
    );
}

export default ConnectModal;
