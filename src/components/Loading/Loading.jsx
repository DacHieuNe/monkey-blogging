import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LoadingStyle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border-radius: 50%;
  border: ${(props) => props.borderSize} solid ${(props) => props.borderColor};
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: 1s linear infinite spin;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const Loading = ({
  width = "40px",
  borderColor = "#fff",
  borderSize = "1px",
}) => {
  return (
    <LoadingStyle
      width={width}
      borderColor={borderColor}
      borderSize={borderSize}
    ></LoadingStyle>
  );
};

Loading.propTypes = {};

export default Loading;
