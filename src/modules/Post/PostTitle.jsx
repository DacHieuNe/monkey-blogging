import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PostTitleStyle = styled.h3`
  a {
    display: inline-block;
    line-height: 1.4;
    padding-right: 12px;
    margin: 12px 0 12px;
    text-decoration: none;
    ${(props) =>
      props.type == "primary" &&
      css`
        color: #000;
        font-size: 16px;
        font-weight: 600;
      `}
    ${(props) =>
      props.type == "secondary" &&
      css`
        color: #fff;
        font-size: 20px;
      `}
    ${(props) =>
      props.type == "tertiary" &&
      css`
        color: #000;
        font-size: 24px;
        font-weight: 600;
      `}
  }
`;
const PostTitle = ({
  className = "",
  type = "primary",
  children,
  to = "/",
}) => {
  return (
    <PostTitleStyle type={type} className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyle>
  );
};

PostTitle.propTypes = {};

export default PostTitle;
