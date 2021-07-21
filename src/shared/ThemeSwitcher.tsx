import React from "react";
import { SvgProps } from "./Svg";
import Text from "./Text/Text";
import Flex from "./Box/Flex";
import Button from "./Button/Button";
import * as IconModule from "./icons";

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { MoonIcon, SunIcon } = Icons;

interface Props {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const ThemeSwitcher: React.FC<Props> = ({ isDark, toggleTheme }) => (
  <Button padding={0} variant="text" onClick={() => toggleTheme(!isDark)}>
    {/* alignItems center is a Safari fix */}
    <Flex alignItems="flex-start">
      <SunIcon color={isDark ? "textDisabled" : "text"} width="24px" />
      <Text mx="4px">
        /
      </Text>
      <MoonIcon color={isDark ? "text" : "textDisabled"} width="24px" />
    </Flex>
  </Button>
);

export default React.memo(ThemeSwitcher, (prev, next) => prev.isDark === next.isDark);
