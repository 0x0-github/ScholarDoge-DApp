import React from "react";
import {H2} from "./index";

export default {
    title: "Components/H2",
    component: H2,
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
                <H2>Default</H2>
            </div>
            <div>
                <H2 color="secondary">Custom color</H2>
            </div>
        </div>
    );
};
