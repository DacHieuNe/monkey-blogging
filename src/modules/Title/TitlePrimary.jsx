import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TitlePrimaryStyle = styled.div`
  position: relative;
  margin-bottom: 20px;
  color: ${(props) => props.theme.purpleLight};
  font-size: 24px;
  font-weight: 600;
  /* &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    width: 40px;
    height: 4px;
    background-color: ${(props) => props.theme.blueDark};
  } */
  @media screen and (max-width: 1023.98px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;
const TitlePrimary = ({ children }) => {
  return <TitlePrimaryStyle>{children}</TitlePrimaryStyle>;
};

TitlePrimary.propTypes = {};

export default TitlePrimary;
