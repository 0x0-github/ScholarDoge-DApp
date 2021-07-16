import "styled-components";
import {ScholarDogeTheme} from "./";

declare module "styled-components" {
    export interface DefaultTheme extends ScholarDogeTheme {
    }
}
