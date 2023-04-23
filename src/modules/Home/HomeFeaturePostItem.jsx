import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { PostButton, PostMeta, PostTitle, PostImage } from "@/modules/Post";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { slugify } from "@/utils/constant";

const HomeFeaturePostItemStyle = styled.div`
  position: relative;
  width: calc((100% / 3) - 30px);

  .image {
    min-height: 220px;
    border-radius: 10px;
  }
  .body {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    color: #000;
  }
  .overlay {
    position: absolute;
    z-index: 1;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .btn {
    color: #000;
    background-color: #fff;
  }
`;
const HomeFeaturePostItem = ({ item }) => {
  const { category, users } = item;
  // const date = new Date(item?.createdAt?.seconds);
  // const meta = {
  //   date: `${date.toString().split(" ").slice(1, 3).join(" ")}`,
  //   author: users?.fullname,
  // };
  // useEffect(() => {
  //   const fetchDocCategory = async () => {
  //     const categoryRef = doc(db, "categories", item.categoryId);
  //     const categoryValue = await getDoc(categoryRef);
  //     setCategory(categoryValue.data());
  //   };
  //   fetchDocCategory();
  // }, []);
  // useEffect(() => {
  //   const fetchDocUser = async () => {
  //     const userRef = doc(db, "users", item.userId);
  //     const userValue = await getDoc(userRef);
  //     setUser(userValue.data());
  //   };
  //   fetchDocUser();
  // }, []);

  return (
    <HomeFeaturePostItemStyle>
      <PostImage className="image" url={item.image_link} to="/" />
      <div className="overlay"></div>
      <div className="body">
        <div className="row items-center justify-between">
          <PostButton to={`/category/${category?.slug}`} className="btn">
            {category?.name}
          </PostButton>
          <PostMeta
            to={`/user/${users?.username}`}
            type="secondary"
            item={item}
          />
        </div>
        <PostTitle to={item.slug} type="secondary">
          {item.title}
        </PostTitle>
      </div>
    </HomeFeaturePostItemStyle>
  );
};

HomeFeaturePostItem.propTypes = {};

export default HomeFeaturePostItem;
