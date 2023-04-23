import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PostMetaStyle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${(props) =>
    props.type == "primary" &&
    css`
      color: #000;
    `}
  ${(props) =>
    props.type == "secondary" &&
    css`
      color: #fff;
    `}
    .date , .author {
    color: currentColor;
    font-size: 15px;
  }
  .dot {
    width: 4px;
    height: 4px;
    margin: 0 12px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;
const PostMeta = ({ className = "", item, type = "primary", to = "/" }) => {
  const date = new Date(item?.createdAt?.seconds);
  const { users } = item;
  return (
    <PostMetaStyle type={type} className={className}>
      <span className="date">
        {date && date.toString().split(" ").slice(1, 3).join(" ")}
      </span>
      <span className="dot"></span>
      <NavLink to={to}>
        <span className="author">{users?.fullname}</span>
      </NavLink>
    </PostMetaStyle>
  );
};

PostMeta.propTypes = {};

export default PostMeta;
