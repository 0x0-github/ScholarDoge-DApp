import React from 'react';
import './Header.css';
import {useTranslation} from 'react-i18next';
import MenuDropDown from './components/MenuDropDown';
import scholarDogeLogo from '../assets/$SDOGE_HEADER.mp4';
import {Login} from "../shared/widgets/WalletModal";
import UserBlock from "../shared/UserBlock";

interface Props {
    account?: string;
    login: Login;
    logout: () => void;
}

function Header({account, login, logout}: Props) {
    const {t} = useTranslation('common');

    return (
        <div className="Header">
            <MenuDropDown/>
            <video className="app-logo" autoPlay loop muted playsInline
                   src={scholarDogeLogo} height="80px">
            </video>
            <h1 className="title">{t('header.title')}</h1>
            <video className="app-logo" autoPlay loop muted playsInline
                   src={scholarDogeLogo} height="80px">
            </video>
            <UserBlock account={account} login={login} logout={logout}/>
        </div>
    );
}

export default Header;
