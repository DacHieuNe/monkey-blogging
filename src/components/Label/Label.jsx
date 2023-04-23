import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelStyle = styled.label`
  margin-bottom: 12px;
  color: ${(props) => props.theme.gray4b};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;
const Label = ({ children, ...props }) => {
  return <LabelStyle {...props}>{children}</LabelStyle>;
};

Label.propTypes = {};

export default Label;
