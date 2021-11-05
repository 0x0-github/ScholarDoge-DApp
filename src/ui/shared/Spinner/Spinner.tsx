import styled from "styled-components";
import "./Spinner.css";
import {Card} from "../Card";
import React, {HTMLAttributes} from "react";
import scholarDogeLogo from "../../../assets/gif/ScholarCoin.gif";

function Spinner() {
    return (
        <StyledSpinner>
            <Card className="spinner-content">
                <img className={"spinner-logo"} alt={"ScholarDoge logo"} src={scholarDogeLogo}/>
            </Card>
        </StyledSpinner>
    );
}

const StyledSpinner = styled.div<HTMLAttributes<HTMLDivElement>>`
  width: 60px;
  height: 60px;
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Spinner;
