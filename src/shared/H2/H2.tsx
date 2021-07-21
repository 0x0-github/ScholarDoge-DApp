import styled from "styled-components";
import {TextProps} from "../Text";

const H2 = styled.h2<TextProps>`
  color: ${({theme}) => theme.colors.text};
`;

export default H2;
