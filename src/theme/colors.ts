import {Colors} from "./types";

export const baseColors = {
    failure: "#b3000d",
    primary: "#D9B35F",
    primaryBright: "#fccf6e",
    primaryDark: "#7b6635",
    secondary: "#000000",
    success: "#3ac600",
    warning: "#bd6600",
};

export const brandColors = {
    binance: "#F0B90B",
};

export const lightColors: Colors = {
    ...baseColors,
    ...brandColors,
    background: "#FAF9FA",
    backgroundDisabled: "#E9EAEB",
    contrast: "#191326",
    invertedContrast: "#FFFFFF",
    input: "#eeeaf4",
    inputSecondary: "#c7b792",
    tertiary: "#EFF4F5",
    text: "#000000",
    textDisabled: "#BDC2C4",
    textSubtle: "#8d7748",
    borderColor: "#E9EAEB",
    card: "#FFFFFF",
    gradients: {
        bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",
    },
};

export const darkColors: Colors = {
    ...baseColors,
    ...brandColors,
    secondary: "#000000",
    background: "#100C18",
    backgroundDisabled: "#8d7e5c",
    contrast: "#FFFFFF",
    invertedContrast: "#3d321a",
    input: "#a3843e",
    inputSecondary: "#827455",
    primaryDark: "#66542c",
    tertiary: "#353547",
    text: "#EAE2FC",
    textDisabled: "#666171",
    textSubtle: "#9c8b65",
    borderColor: "#000000",
    card: "#27262c",
    gradients: {
        bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
    },
};
