import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PostImageStyle = styled.div`
  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
    aspect-ratio: 16/10;
  }
`;
const PostImage = ({ className, url, to = "" }) => {
  if (to) {
    return (
      <PostImageStyle className={className}>
        <NavLink to={to}>
          <img src={url} alt="image" />
        </NavLink>
      </PostImageStyle>
    );
  }
  return (
    <PostImageStyle className={className}>
      <img src={url} alt="image" />
    </PostImageStyle>
  );
};

PostImage.propTypes = {};

export default PostImage;
