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
            borderColor: theme.colors.secondary
        }),
        input: (styles: any) => ({
            ...styles,
            color: theme.colors.primary
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: theme.colors.primary
        }),
        clearIndicator: (styles: any) => ({
            ...styles,
            color: theme.colors.primary
        }),
        placeholder: (styles: any) => ({
            ...styles,
            color: theme.colors.primary
        }),
        dropdownIndicator: (styles: any) => ({
            ...styles,
            color: theme.colors.primary,
        }),
        indicatorSeparator: (styles: any) => ({
            ...styles,
            color: theme.colors.primary,
        }),
        noOptionsMessage: (styles: any) => ({
            ...styles,
            color: theme.colors.primary,
        }),
        menuList: (styles: any) => ({
            ...styles,
            color: theme.colors.primary,
            backgroundColor: theme.colors.tertiary,
        }),
        option: (styles: any) => {
            return {
                ...styles,
                backgroundColor: theme.colors.tertiary,
                color: theme.colors.primary,
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
  box-shadow: ${({theme}) => theme.shadows.level1};
  border-radius: ${({theme}) => theme.radii.small};
`;

export default RewardTokenSelect;
