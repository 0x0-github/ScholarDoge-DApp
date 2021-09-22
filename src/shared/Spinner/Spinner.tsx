import styled from "styled-components";
import "./Spinner.css";
import {Card} from "../Card";
import React, {HTMLAttributes} from "react";
import useTheme from "../../hooks/useTheme";
import scholarDogeLogoDark from "../../assets/$SDOGE_HEADER_DARK.mp4";
import scholarDogeLogo from "../../assets/$SDOGE_HEADER.mp4";

function Spinner() {
    const { isDark } = useTheme();

    return (
        <StyledSpinner>
            <Card className="spinner-content">
                <video className="spinner" autoPlay loop muted playsInline
                       src={isDark ? scholarDogeLogoDark : scholarDogeLogo} height="90px" width="90px">
                </video>
            </Card>
        </StyledSpinner>
    );
}

const StyledSpinner = styled.div<HTMLAttributes<HTMLDivElement>>`
  width: 100px;
  height: 100px;
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Spinner;
