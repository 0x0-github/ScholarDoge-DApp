import styled from "styled-components";
import Text from "../Text/Text";
import {TextProps} from "../Text";

const H2 = styled(Text)<TextProps>`
  color: ${({theme}) => theme.colors.text};
  margin-top: 0;
  margin-bottom: 32px;
  font-weight: 500;
  line-height: 1.2;
  font-size: calc(1.325rem + 0.9vw);
  text-align: center;
`;

export default H2;
