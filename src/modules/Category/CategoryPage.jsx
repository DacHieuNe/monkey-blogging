import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Layout } from "@/components/Layout";
import { TitlePrimary } from "@/modules/Title";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { HomeFeaturePostItem } from "@/modules/Home";
import styled from "styled-components";

const CategoryPageStyle = styled.div`
  .category__layout {
    & > .row {
      gap: 15px;
    }
  }
`;
const CategoryPage = (props) => {
  const [postList, setPostList] = useState([]);

  const { slug } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const colRef = query(
        collection(db, "posts"),
        where("category.slug", "==", slug)
      );
      onSnapshot(colRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(results);
      });
    };
    fetchData();
  }, []);
  console.log("postList", postList);
  return (
    <CategoryPageStyle>
      <Layout>
        <div className="category__layout container">
          <TitlePrimary>Post have category name: {slug}</TitlePrimary>
          <div className="row">
            {Array.isArray(postList) &&
              postList.length > 0 &&
              postList.map((item) => (
                <HomeFeaturePostItem item={item} key={item.id} />
              ))}
          </div>
        </div>
      </Layout>
    </CategoryPageStyle>
  );
};

CategoryPage.propTypes = {};

export default CategoryPage;
