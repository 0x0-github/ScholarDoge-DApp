import {AlertTheme} from "../shared/Alert/types";
import {CardTheme} from "../shared/Card/types";
import {RadioTheme} from "../shared/Radio/types";
import {ToggleTheme} from "../shared/Toggle/types";
import {TooltipTheme} from "../shared/Tooltip/types";
import {ModalTheme} from "../shared/widgets/Modal/types";
import {Breakpoints, Colors, MediaQueries, Radii, Shadows, Spacing, ZIndices} from "./types";

export interface ScholarDogeTheme {
    siteWidth: number;
    isDark: boolean;
    alert: AlertTheme;
    colors: Colors;
    card: CardTheme;
    modal: ModalTheme;
    radio: RadioTheme;
    toggle: ToggleTheme;
    tooltip: TooltipTheme;
    breakpoints: Breakpoints;
    mediaQueries: MediaQueries;
    spacing: Spacing;
    shadows: Shadows;
    radii: Radii;
    zIndices: ZIndices;
}

export {default as dark} from "./dark";
export {default as light} from "./light";

export {lightColors} from "./colors";
export {darkColors} from "./colors";
