import {DefaultTheme} from "styled-components";
import {dark as darkAlert} from "../shared/Alert/theme";
import {dark as darkCard} from "../shared/Card/theme";
import {dark as darkRadio} from "../shared/Radio/theme";
import {dark as darkToggle} from "../shared/Toggle/theme";
import {dark as darkModal} from "../shared/widgets/Modal/theme";
import {dark as darkTooltip} from "../shared/Tooltip/theme";
import base from "./base";
import {darkColors} from "./colors";

const darkTheme: DefaultTheme = {
    ...base,
    isDark: true,
    alert: darkAlert,
    colors: darkColors,
    card: darkCard,
    toggle: darkToggle,
    modal: darkModal,
    radio: darkRadio,
    tooltip: darkTooltip,
};

export default darkTheme;
