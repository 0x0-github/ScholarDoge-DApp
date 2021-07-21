import styled from "styled-components";
import Text from "../Text/Text";
import {TextProps} from "../Text";

const H1 = styled(Text)<TextProps>`
  color: ${({theme}) => theme.colors.text};
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  font-size: calc(1.375rem + 1.5vw);
  text-align: center;
`;

export default H1;
