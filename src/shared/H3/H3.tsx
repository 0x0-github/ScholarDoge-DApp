import styled from "styled-components";
import {TextProps} from "../Text";

const H3 = styled.h3<TextProps>`
  color: ${({theme}) => theme.colors.text};
`;

export default H3;
