import styled from "styled-components";
import "./Spinner.css";
import {Card} from "../Card";
import React, {HTMLAttributes} from "react";
import spinner from '../../assets/ScholarCoin.mp4';

function Spinner() {
    return (
        <StyledSpinner>
            <Card className="spinner-content">
                <video className="spinner" autoPlay loop muted playsInline
                       src={spinner} height="40px" width="40px">
                </video>
            </Card>
        </StyledSpinner>
    );
}

const StyledSpinner = styled.div<HTMLAttributes<HTMLDivElement>>`
  width: 50px;
  height: 50px;
  position:fixed;
  top: 50%;
  left: 50%;
`;

export default Spinner;
