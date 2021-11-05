import {DefaultTheme} from "styled-components";
import {light as lightAlert} from "../ui/shared/Alert/theme";
import {light as lightCard} from "../ui/shared/Card/theme";
import {light as lightRadio} from "../ui/shared/Radio/theme";
import {light as lightToggle} from "../ui/shared/Toggle/theme";
import {light as lightTooltip} from "../ui/shared/Tooltip/theme";
import {light as lightModal} from "../ui/shared/widgets/Modal/theme";
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
