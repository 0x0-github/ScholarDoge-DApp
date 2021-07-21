import styled from "styled-components";
import {TextProps} from "../Text";

const H1 = styled.h1<TextProps>`
  color: ${({theme}) => theme.colors.text};
`;

export default H1;
