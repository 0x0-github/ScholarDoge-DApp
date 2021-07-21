import React from "react";
import Button from "../../Button/Button";
import Text from "../../Text/Text";
import Link from "../../Link/Link";
import Flex from "../../Box/Flex";
import {Modal} from "../Modal";
import CopyToClipboard from "./CopyToClipboard";
import {connectorLocalStorageKey} from "./config";
import {useTranslation} from "react-i18next";

interface Props {
    account: string;
    logout: () => void;
    onDismiss?: () => void;
}

const AccountModal: React.FC<Props> = ({account, logout, onDismiss = () => null}) => {
    const {t} = useTranslation('common');

    return (
        <Modal title={t('auth.your_wallet')} onDismiss={onDismiss}>
            <Text
                fontSize="20px"
                bold
                style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "8px"}}
            >
                {account}
            </Text>
            <Flex mb="32px">
                <Link small href={`https://bscscan.com/address/${account}`} mr="16px">
                    {t('auth.view_bscscan')}
                </Link>
                <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>
            </Flex>
            <Flex justifyContent="center">
                <Button
                    scale="sm"
                    variant="secondary"
                    onClick={() => {
                        logout();
                        localStorage.removeItem(connectorLocalStorageKey);
                        onDismiss();
                    }}
                >
                    {t('auth.logout')}
                </Button>
            </Flex>
        </Modal>
    );
}

export default AccountModal;
