import React from "react";
import Button from "./Button/Button";
import {Login, useWalletModal} from "./widgets/WalletModal";
import {useTranslation} from "react-i18next";

interface Props {
    account?: string;
    login: Login;
    logout: () => void;
}

const UserBlock: React.FC<Props> = ({account, login, logout}) => {
    const {t} = useTranslation('common');
    const {onPresentConnectModal, onPresentAccountModal} = useWalletModal(login, logout, account);
    const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

    return (
        <div>
            {account ? (
                <Button
                    scale="sm"
                    variant="primary"
                    onClick={() => {
                        onPresentAccountModal();
                    }}
                >
                    {accountEllipsis}
                </Button>
            ) : (
                <Button
                    scale="sm"
                    onClick={() => {
                        onPresentConnectModal();
                    }}
                >
                    {t('auth.connect')}
                </Button>
            )}
        </div>
    );
};

export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account);
