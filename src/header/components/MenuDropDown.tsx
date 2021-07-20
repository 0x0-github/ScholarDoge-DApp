import React from 'react';
import './MenuDropDown.css';
import {Dropdown} from "react-bootstrap";
import contracts from "../../config/constants/contracts";
import urls from "../../config/constants/urls";
import {useTranslation} from 'react-i18next';
import Menu from '@material-ui/icons/Menu';
import chains from "../../config/constants/chains";

function MenuDropDown() {
    const {t} = useTranslation('common');
    const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
        : chains.mainnet.toString(), 10);
    // @ts-ignore
    const tokenAddr = contracts.scholarDogeToken[chainId];

    return (<Dropdown>
        <Dropdown.Toggle id="menu-dropdown" size={'sm'}>
            <Menu/>
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item className="dropdown-item" href="/">{t('header.menu.dashboard')}</Dropdown.Item>
            <Dropdown.Item className="dropdown-item"
                           href={urls.baseDexURL + '/#/swap?outputCurrency=' + tokenAddr}>
                {t('header.menu.buy')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item"
                           href={'https://testnet.bscscan.com/address/' + tokenAddr}>
                {t('header.menu.contract')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#audit" disabled>{t('header.menu.audit')}</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="/lottery" disabled>{t('header.menu.lottery')}</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="/team" disabled>{t('header.menu.team')}</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>);
}

export default MenuDropDown;
