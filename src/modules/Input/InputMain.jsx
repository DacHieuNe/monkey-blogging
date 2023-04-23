import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputWrap = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    height: 55px;
    padding: 16px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 10px;
    background-color: ${(props) => props.theme.grayLight};
    font-size: 16px;
    transition: 0.5s;
    &::placeholder {
      color: ${(props) => props.theme.grayDark};
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
const InputMain = ({
  onClickIcon = () => {},
  children,
  control,
  name,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputWrap>
      <input id={name} {...props} {...field} />
      {children && (
        <span className="input-icon" onClick={onClickIcon}>
          {children}
        </span>
      )}
    </InputWrap>
  );
};

InputMain.propTypes = {};

export default InputMain;
