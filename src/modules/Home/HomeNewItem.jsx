import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { PostButton, PostMeta, PostTitle, PostImage } from "@/modules/Post";

const HomeNewItemStyle = styled.div`
  width: 100%;
  padding: 15px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  .body {
    padding-bottom: 15px;
    border-bottom: 1px solid #000;
    color: #000;
  }
  .image {
    width: 220px;
    margin-right: 16px;
    border-radius: 10px;
  }
  .info {
    flex: 1;
  }
  .btn {
    margin: 12px 0 0;
    background-color: #fff;
  }
`;
const HomeNewItem = ({ data }) => {
  if (!data) return null;
  const { users, category, image_link, title, createdAt, slug } = data;
  const meta = {
    users,
    createdAt,
  };
  return (
    <HomeNewItemStyle>
      <div className="body">
        <div className="row">
          <PostImage url={image_link} className="image" to="/" />
          <div className="info">
            <PostButton to={`/category/${category?.slug}`} className="btn">
              {category?.name}
            </PostButton>
            <PostTitle to={`/${slug}`} className="title">
              {title}
            </PostTitle>
            <PostMeta to={`/user/${users.username}`} item={meta} />
          </div>
        </div>
      </div>
    </HomeNewItemStyle>
  );
};

HomeNewItem.propTypes = {};

export default HomeNewItem;
