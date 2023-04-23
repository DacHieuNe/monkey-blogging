import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { PostButton, PostMeta, PostTitle, PostImage } from "@/modules/Post";

const HomePostItemStyle = styled.div`
  ${(props) =>
    props.width == "normal" &&
    css`
      width: 100%;
    `};
  ${(props) =>
    props.width == "primary" &&
    css`
      width: calc(100% / 4 - 30px);
    `};
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  .body {
    padding-bottom: 15px;
    color: #000;
  }
  .image {
    width: 100%;
  }
  .btn {
    margin: 12px 0 0;
    color: #000;
    background-color: ${(props) => props.theme.grayLight};
  }
`;
const HomePostItem = ({ item, width = "normal" }) => {
  const { category, image_link, title, createdAt, users, slug } = item;
  return (
    <HomePostItemStyle width={width}>
      <div className="body">
        <PostImage url={image_link} className="image" to="/" />
        <PostButton to={`/category/${category?.slug}`} className="btn">
          {category?.name}
        </PostButton>
        <PostTitle to={`/${slug}`}>{title}</PostTitle>
        <PostMeta
          item={{
            createdAt,
            users,
          }}
          to={`/user/${users?.username}`}
        />
      </div>
    </HomePostItemStyle>
  );
};

HomePostItem.propTypes = {};

export default HomePostItem;
