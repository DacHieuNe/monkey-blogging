import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PostButtonStyle = styled.button`
  padding: 8px;
  border: none;
  border-radius: 5px;
  color: #000;
  background-image: initial;
  font-size: 15px;
`;
const PostButton = ({
  className = "",
  type = "button",
  children,
  to = "/",
}) => {
  return (
    <PostButtonStyle type={type} className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostButtonStyle>
  );
};

PostButton.propTypes = {};

export default PostButton;
