import React from "react";
import {H1} from "./index";

export default {
    title: "Components/H1",
    component: H1,
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
                <H1>Default</H1>
            </div>
            <div>
                <H1 color="secondary">Custom color</H1>
            </div>
        </div>
    );
};
