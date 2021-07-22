import styled from "styled-components";
import {LinkProps} from "./types";

const Link = styled.a<LinkProps>`
  cursor: pointer;
  color: ${({theme}) => theme.colors.secondary};
  font-weight: bold;
  text-align: center;
  &:hover {
    text-decoration: underline;
    color: ${({theme}) => theme.colors.accent};
  }
`;

export default Link;
