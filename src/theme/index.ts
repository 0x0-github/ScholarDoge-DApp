import {AlertTheme} from "../ui/shared/Alert/types";
import {CardTheme} from "../ui/shared/Card/types";
import {RadioTheme} from "../ui/shared/Radio/types";
import {ToggleTheme} from "../ui/shared/Toggle/types";
import {TooltipTheme} from "../ui/shared/Tooltip/types";
import {ModalTheme} from "../ui/shared/widgets/Modal/types";
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
