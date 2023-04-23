import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { PostButton, PostImage, PostMeta, PostTitle } from "@/modules/Post";

const HomeNewIntroStyle = styled.div`
  .body {
    padding: 0 15px;
    color: #000;
  }
  .image {
    width: 100%;
    height: 410px;
    border-radius: 10px;
  }
  .btn {
    margin: 12px 0 0;
    background-color: ${(props) => props.theme.grayLight};
  }
`;
const HomeNewIntro = ({ data }) => {
  if (!data) return null;
  const { users, category, image_link, title, createdAt, slug } = data;
  const meta = {
    users,
    createdAt,
  };
  return (
    <HomeNewIntroStyle>
      <div className="body">
        <PostImage url={image_link} className="image" />
        <PostButton to={`/category/${category?.slug}`} className="btn">
          {category?.name}
        </PostButton>
        <PostTitle to={`/${slug}`} type="tertiary">
          {title}
        </PostTitle>
        <PostMeta to={`/user/${users?.username}`} item={meta} />
      </div>
    </HomeNewIntroStyle>
  );
};

HomeNewIntro.propTypes = {};

export default HomeNewIntro;
