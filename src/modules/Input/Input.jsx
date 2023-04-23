import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyle = styled.div`
  position: relative;
  width: 100%;
  color: ${(props) => props.color};
  input {
    width: 100%;
    height: 55px;
    padding: 16px;
    outline: none;
    border: 1px solid ${(props) => props.color};
    border-radius: 10px;
    font-size: 16px;
    transition: 0.5s;
    &::-webkit-input-placeholder {
      color: ${(props) => props.color};
      font-family: "Poppins", sans-serif;
      font-size: 16px;
    }
    &:focus {
      border-color: ${(props) => props.theme.primary};
      background-color: transparent;
    }
  }
  .input-icon {
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translateY(-50%);
    cursor: pointer;
    svg {
      width: 22px !important;
      height: 22px !important;
    }
  }
`;
const Input = ({
  color = "#ccc",
  onClickIcon = () => {},
  children,
  ...props
}) => {
  return (
    <InputStyle color={color}>
      <input {...props} />
      {children && (
        <span className="input-icon" onClick={onClickIcon}>
          {children}
        </span>
      )}
    </InputStyle>
  );
};

Input.propTypes = {};

export default Input;
