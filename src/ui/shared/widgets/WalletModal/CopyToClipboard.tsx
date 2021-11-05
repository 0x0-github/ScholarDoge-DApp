import React, {useState} from "react";
import styled from "styled-components";
import Text from "../../Text/Text";
import {CopyIcon} from "../../Svg";
import {useTranslation} from "react-i18next";

interface Props {
    toCopy: string;
}

const StyleButton = styled(Text).attrs({role: "button"})`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.secondary};
  &:hover {
    color: ${({theme}) => theme.colors.accent};
  }
`;

const StyleIcon = styled(CopyIcon).attrs({role: "button"})`
  color: ${({theme}) => theme.colors.secondary};
  &:hover {
    color: ${({theme}) => theme.colors.accent};
  }
`;

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({isTooltipDisplayed}) => (isTooltipDisplayed ? "block" : "none")};
  position: absolute;
  bottom: -22px;
  right: 0;
  left: 0;
  text-align: center;
  background-color: ${({theme}) => theme.colors.contrast};
  color: ${({theme}) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
`;

const CopyToClipboard: React.FC<Props> = ({toCopy, children, ...props}) => {
    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
    const {t} = useTranslation('common');

    return (
        <StyleButton
            small
            bold
            onClick={() => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(toCopy);
                    setIsTooltipDisplayed(true);
                    setTimeout(() => {
                        setIsTooltipDisplayed(false);
                    }, 1000);
                }
            }}
            {...props}
        >
            {children}
            <CopyIcon width="20px" color="secondary" ml="4px"/>
            <Tooltip isTooltipDisplayed={isTooltipDisplayed}>{t('common.copied')}</Tooltip>
        </StyleButton>
    );
};

export default CopyToClipboard;
