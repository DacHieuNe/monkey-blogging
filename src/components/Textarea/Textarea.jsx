import React, { useState, useEffect, useRef } from "react";
import { useController, useWatch } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextareaStyle = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    min-height: 100px;
    padding: 16px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 10px;
    background-color: ${(props) => props.theme.grayLight};
    font-size: 16px;
    resize: none;
    overflow: hidden;
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
`;
const Textarea = ({ setValue, control, name, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: "",
  });
  const [check, setCheck] = useState(false);
  const nodeRef = useRef();
  const handleChangeTextarea = (e) => {
    if (e.target.scrollHeight + 2 > 100) {
      setCheck(true);
    }
    if (check) {
      nodeRef.current.style.minHeight = "auto";
    }
    nodeRef.current.style.minHeight = e.target.scrollHeight + 2 + "px";
    setValue(name, e.target.value);
  };
  return (
    <TextareaStyle>
      <textarea
        id={name}
        {...props}
        {...field}
        ref={nodeRef}
        onChange={handleChangeTextarea}
      />
    </TextareaStyle>
  );
};

Textarea.propTypes = {};

export default Textarea;
