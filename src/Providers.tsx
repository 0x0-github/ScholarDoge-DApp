import React from 'react'
import {ModalProvider} from './shared/widgets/Modal'
import {Web3ReactProvider} from '@web3-react/core'
import {getLibrary} from './utils/web3React'
import {ThemeContextProvider} from './contexts/ThemeContext'
import {RefreshContextProvider} from './contexts/RefreshContext'
import {ToastsProvider} from './contexts/toasts'

const Providers: React.FC = ({children}) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <ToastsProvider>
                <ThemeContextProvider>
                    <RefreshContextProvider>
                        <ModalProvider>{children}</ModalProvider>
                    </RefreshContextProvider>
                </ThemeContextProvider>
            </ToastsProvider>
        </Web3ReactProvider>
    )
}

export default Providers;
