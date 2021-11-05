import {DefaultTheme} from "styled-components";
import {dark as darkAlert} from "../ui/shared/Alert/theme";
import {dark as darkCard} from "../ui/shared/Card/theme";
import {dark as darkRadio} from "../ui/shared/Radio/theme";
import {dark as darkToggle} from "../ui/shared/Toggle/theme";
import {dark as darkModal} from "../ui/shared/widgets/Modal/theme";
import {dark as darkTooltip} from "../ui/shared/Tooltip/theme";
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
