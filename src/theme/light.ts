import {DefaultTheme} from "styled-components";
import {light as lightAlert} from "../shared/Alert/theme";
import {light as lightCard} from "../shared/Card/theme";
import {light as lightRadio} from "../shared/Radio/theme";
import {light as lightToggle} from "../shared/Toggle/theme";
import {light as lightTooltip} from "../shared/Tooltip/theme";
import {light as lightModal} from "../shared/widgets/Modal/theme";
import base from "./base";
import {lightColors} from "./colors";

const lightTheme: DefaultTheme = {
    ...base,
    isDark: false,
    alert: lightAlert,
    colors: lightColors,
    card: lightCard,
    toggle: lightToggle,
    modal: lightModal,
    radio: lightRadio,
    tooltip: lightTooltip,
};

export default lightTheme;
