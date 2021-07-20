import React from "react";
import Button from "../../Button/Button";
import Text from "../../Text/Text";
import {connectorLocalStorageKey} from "./config";
import {Config, Login} from "./types";

interface Props {
    walletConfig: Config;
    login: Login;
    onDismiss: () => void;
    mb: string;
}

const WalletCard: React.FC<Props> = ({login, walletConfig, onDismiss, mb}) => {
    const {title, icon: Icon} = walletConfig;
    return (
        <Button
            width="100%"
            variant="primary"
            onClick={() => {
                login(walletConfig.connectorId);
                localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
                onDismiss();
            }}
            style={{justifyContent: "space-between"}}
            mb={mb}
            id={`wallet-connect-${title.toLocaleLowerCase()}`}
        >
            <Text bold color="secondary" mr="16px">
                {title}
            </Text>
            <Icon width="32px"/>
        </Button>
    );
};

export default WalletCard;
