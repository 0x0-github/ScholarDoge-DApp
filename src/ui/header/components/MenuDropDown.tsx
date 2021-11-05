import React from 'react';
import './MenuDropDown.css';
import {Dropdown} from "react-bootstrap";
import contracts from "../../../config/constants/contracts";
import urls from "../../../config/constants/urls";
import {useTranslation} from 'react-i18next';
import Menu from '@material-ui/icons/Menu';
import chains from "../../../config/constants/chains";
import useTheme from "../../../hooks/useTheme";
import styled from "styled-components";
import useTestClaim from "../../../hooks/useTestClaim";
import {
    AccountBalanceWallet, Build,
    Casino,
    Description,
    Group,
    MonetizationOn,
    Poll,
    Security,
    SwapHoriz
} from "@material-ui/icons";

function MenuDropDown() {
    const {t} = useTranslation('common');
    const { theme } = useTheme();
    const chainId = parseInt((process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
        : chains.mainnet.toString(), 10);
    // @ts-ignore
    const tokenAddr = contracts.scholarDogeToken[chainId];
    const {onTestClaim} = useTestClaim();
    const handleTestClaim = async () => {
        await onTestClaim();
    }

    return (<Dropdown>
        <StyledDropDownButton>
            <Dropdown.Toggle className={theme.isDark ? 'dark-toggle' : 'light-toggle'} size={'sm'}>
                <Menu/>
            </Dropdown.Toggle>
        </StyledDropDownButton>

        <StyledDropDownMenu className={theme.isDark ? 'dark-menu' : 'light-menu'}>
            <Dropdown.Item className="dropdown-item" href="/tokenomics">
                <Poll className={"dropdown-img"}/>
                {t('header.menu.tokenomics')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="/rewards">
                <MonetizationOn className={"dropdown-img"}/>
                {t('header.menu.rewards')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="/project-wallets">
                <AccountBalanceWallet className={"dropdown-img"}/>
                {t('header.menu.project_wallets')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item"
                           href={urls.baseDexURL + '/#/swap?outputCurrency=' + tokenAddr}>
                <SwapHoriz className={"dropdown-img"}/>
                {t('header.menu.buy')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item"
                           href={'https://testnet.bscscan.com/address/' + tokenAddr}>
                <Description className={"dropdown-img"}/>
                {t('header.menu.contract')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#audit" disabled>
                <Security className={"dropdown-img"}/>
                {t('header.menu.audit')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="/lottery" disabled>
                <Casino className={"dropdown-img"}/>
                {t('header.menu.lottery')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="/team" disabled>
                <Group className={"dropdown-img"}/>
                {t('header.menu.team')}
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item" onClick={() => {handleTestClaim()}}>
                <Build className={"dropdown-img"}/>
                {t('header.menu.claim_testnet')}
            </Dropdown.Item>
        </StyledDropDownMenu>
    </Dropdown>);
}

const StyledDropDownButton = styled.div`
  .light-toggle:hover, .light-toggle:checked, .light-toggle:focus, .light-toggle:active, .dark-toggle:hover,
  .dark-toggle:checked, .dark-toggle:focus, .dark-toggle:active {
    background: ${({theme}) => theme.colors.tertiary} !important;
    color: ${({theme}) => theme.colors.accent} !important;
    box-shadow: none !important;
    opacity: 0.65;
}
`;

const StyledDropDownMenu = styled(Dropdown.Menu)`
  .dropdown-item:hover {
    background: ${({theme}) => theme.colors.tertiary} !important;
    color: ${({theme}) => theme.colors.accent} !important;
    box-shadow: none !important;
    opacity: 0.65;
  }
`;

export default MenuDropDown;