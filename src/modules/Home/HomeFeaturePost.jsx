import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TitlePrimary } from "@/modules/Title";
import HomeFeaturePostItem from "./HomeFeaturePostItem";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

const HomeFeaturePostStyle = styled.div`
  margin: 60px 0;
  .container {
    & > .row {
      gap: 30px;
    }
  }
`;
const HomeFeaturePost = (props) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(q, (docs) => {
      const results = [];
      docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList(results);
    });
  }, []);
  if (postList.length <= 0) return null;
  return (
    <HomeFeaturePostStyle>
      <div className="container">
        <TitlePrimary>Featured Posts</TitlePrimary>
        <div className="row">
          {Array.isArray(postList) &&
            postList.length > 0 &&
            postList.map((item) => (
              <HomeFeaturePostItem item={item} key={item.id} />
            ))}
        </div>
      </div>
    </HomeFeaturePostStyle>
  );
};

HomeFeaturePost.propTypes = {};

export default HomeFeaturePost;
