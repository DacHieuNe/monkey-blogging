import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// presentational component ( specialization component )
const ButtonStyle = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 5px;
  border: none;
  outline: none;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.kind == "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param {string} type type of button is "reset" , "submit", "button"
 * @requires
 * @returns
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  ...props
}) => {
  return (
    <ButtonStyle kind={kind} type={type} onClick={onClick} {...props}>
      {children}
    </ButtonStyle>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
