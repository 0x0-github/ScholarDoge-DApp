import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";
import Providers from "./Providers";

i18next.init({
    interpolation: {escapeValue: false},
    lng: 'en',
    resources: {
        en: {
            common: common_en
        },
        fr: {
            common: common_fr
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Anton&family=Nunito&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"/>
        <I18nextProvider i18n={i18next}>
            <Providers>
                <App/>
            </Providers>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
