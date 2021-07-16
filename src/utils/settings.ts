import BigNumber from 'bignumber.js'
import {getDecimalAmount} from './formatBalance'
import chains from '../config/constants/chains'

export interface UserSettings {
    gasPrice: number;
}

export const VERSION = 1;

export const GAS_SETTINGS = {
    // @ts-ignore
    default: chains.gasPrice[chains.mainnet],
    fast: 10,
    reallyfast: 15,
}

export const getGasPriceInWei = (amountInGwei: number) => {
    return getDecimalAmount(new BigNumber(amountInGwei), 9);
}

export const getDefaultSettings = (): UserSettings => ({
    gasPrice: Number.parseInt(GAS_SETTINGS.default, 10)
})

export const getStorageKey = (account: string) => {
    return `scholar_doge_settings_${account}_${VERSION}`;
}

export const getSettings = (account: string): UserSettings => {
    try {
        const settingsFromLs = localStorage.getItem(getStorageKey(account));

        return settingsFromLs ? JSON.parse(settingsFromLs) : getDefaultSettings();
    } catch (error) {
        return getDefaultSettings();
    }
}

export const setSettings = (account: string, newSettings: UserSettings) => {
    localStorage.setItem(getStorageKey(account), JSON.stringify(newSettings));
}

export const setSetting = (account: string, newSetting: Partial<UserSettings>) => {
    const currentSettings = getSettings(account);

    setSettings(account, {...currentSettings, ...newSetting});
}
