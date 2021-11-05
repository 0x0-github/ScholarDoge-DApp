import React, {HTMLAttributes} from 'react';
import './Header.css';
import {useTranslation} from 'react-i18next';
import MenuDropDown from './components/MenuDropDown';
import scholarDogeLogo from '../../assets/mp4/$SDOGE_HEADER.mp4';
import scholarDogeLogoDark from '../../assets/mp4/$SDOGE_HEADER_DARK.mp4';
import {Login} from "../shared/widgets/WalletModal";
import UserBlock from "../shared/UserBlock";
import {H1} from "../shared/H1";
import ThemeSwitcher from "../shared/ThemeSwitcher";
import useTheme from "../../hooks/useTheme";
import styled from "styled-components";

interface Props {
    account?: string;
    login: Login;
    logout: () => void;
}

function Header({account, login, logout}: Props) {
    const {t} = useTranslation('common');
    const { isDark, toggleTheme } = useTheme();

    return (
        <StyledHeader className="Header">
            <MenuDropDown/>
            <video className="app-logo" autoPlay loop muted playsInline
                   src={isDark ? scholarDogeLogoDark : scholarDogeLogo} height="80px">
            </video>
            <H1 className="title">{t('header.title')}</H1>
            <video className="app-logo" autoPlay loop muted playsInline
                   src={isDark ? scholarDogeLogoDark : scholarDogeLogo} height="80px">
            </video>
            <UserBlock account={account} login={login} logout={logout}/>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme}/>
        </StyledHeader>
    );
}

const StyledHeader = styled.div<HTMLAttributes<HTMLDivElement>>`
  background-color: ${({theme}) => theme.colors.header};
  `;

export default Header;
