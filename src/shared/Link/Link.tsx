import styled from "styled-components";
import Text from "../Text/Text";
import {LinkProps} from "./types";

const Link = styled(Text)<LinkProps>`
  cursor: pointer;
  color: ${({theme}) => theme.colors.secondary};
  font-weight: bold;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

export default Link;
