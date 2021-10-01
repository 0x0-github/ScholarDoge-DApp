import styled from "styled-components";
import "./RewardTokenSelect.css";
import React, {HTMLAttributes} from "react";
import Select from "react-select";
import useTheme from "../../hooks/useTheme";

function RewardTokenSelect(props: any) {
    const { theme } = useTheme();
    const colourStyles = {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: theme.colors.tertiary,
            borderColor: theme.colors.tertiary
        }),
        input: (styles: any) => ({
            ...styles,
            color: theme.colors.accent
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: theme.colors.accent
        }),
        clearIndicator: (styles: any) => ({
            ...styles,
            color: theme.colors.primary
        }),
        placeholder: (styles: any) => ({
            ...styles,
            color: theme.colors.accent
        }),
        dropdownIndicator: (styles: any) => ({
            ...styles,
            color: theme.colors.accent,
        }),
        indicatorSeparator: (styles: any) => ({
            ...styles,
            backgroundColor: theme.colors.accent
        }),
        noOptionsMessage: (styles: any) => ({
            ...styles,
            color: theme.colors.accent,
        }),
        menuList: (styles: any) => ({
            ...styles,
            color: theme.colors.accent,
            backgroundColor: theme.colors.tertiary,
        }),
        option: (styles: any) => {
            return {
                ...styles,
                backgroundColor: theme.colors.tertiary,
                color: theme.colors.accent,
                borderColor: theme.colors.secondary
            };
        }
    };
    const onChange = (selectedOption: {value: string, label: string}) => {
        props.rewardTokenChanged(selectedOption.value);
    }

    return (
        <StyledRewardTokenSelect>
            <Select options={props.options}
                    onChange={onChange}
                    value={props.selected}
                    styles={colourStyles}
                    className={"reward-token-select"}/>
        </StyledRewardTokenSelect>
    );
}

const StyledRewardTokenSelect = styled.div<HTMLAttributes<HTMLDivElement>>`
  background-color: transparent;
  border-radius: ${({theme}) => theme.radii.small};

  > div > div:hover, > div > div {
    box-shadow: 0 0 0 1px ${({theme}) => theme.colors.primary};
    border-color: ${({theme}) => theme.colors.primary};
  }
  > div > div {
    box-shadow: 0 0 0 1px ${({theme}) => theme.colors.tertiary};
    border-color: ${({theme}) => theme.colors.tertiary};
  }
`;

export default RewardTokenSelect;
