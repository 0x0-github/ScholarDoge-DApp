import {scales, variants} from "./types";

export const scaleVariants = {
    [scales.MD]: {
        height: "48px",
        padding: "0 24px",
    },
    [scales.SM]: {
        height: "32px",
        padding: "0 16px",
    },
    [scales.XS]: {
        height: "20px",
        fontSize: "12px",
        padding: "0 8px",
    },
};

export const styleVariants = {
    [variants.PRIMARY]: {
        backgroundColor: "secondary",
        border: "2px solid",
        borderColor: "primary",
        boxShadow: "none",
        color: "primary",
        ":disabled": {
            backgroundColor: "transparent",
        },
    },
    [variants.SECONDARY]: {
        backgroundColor: "tertiary",
        boxShadow: "none",
        color: "accent",
    },
    [variants.TERTIARY]: {
        // TODO
    },
    [variants.SUBTLE]: {
        backgroundColor: "textSubtle",
        color: "white",
    },
    [variants.DANGER]: {
        backgroundColor: "failure",
        color: "white",
    },
    [variants.SUCCESS]: {
        backgroundColor: "success",
        color: "white",
    },
    [variants.TEXT]: {
        backgroundColor: "transparent",
        color: "primary",
        boxShadow: "none",
    },
};
