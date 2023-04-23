import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FieldStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  margin-bottom: 25px;
`;
const Field = ({ children, ...props }) => {
  return <FieldStyle {...props}>{children}</FieldStyle>;
};

Field.propTypes = {};

export default Field;
