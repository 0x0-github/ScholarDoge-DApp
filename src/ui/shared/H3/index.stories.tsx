import React from "react";
import {H3} from "./index";

export default {
    title: "Components/H3",
    component: H3,
    argTypes: {
        fontSize: {
            name: "fontSize",
            table: {
                type: {summary: "string", detail: "Fontsize in px or em"},
                defaultValue: {summary: "16px"},
            },
            control: {
                type: null,
            },
        },
    },
};

export const Default: React.FC = () => {
    return (
        <div>
            <div>
                <H3>Default</H3>
            </div>
            <div>
                <H3 color="secondary">Custom color</H3>
            </div>
        </div>
    );
};
