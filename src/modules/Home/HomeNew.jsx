import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import HomeNewItem from "./HomeNewItem";
import HomeNewIntro from "./HomeNewIntro";
import { TitlePrimary } from "@/modules/Title";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { postStatus, slugify } from "@/utils/constant";

const HomeNewStyle = styled.div`
  .container {
    & > .row {
      margin-left: -15px;
    }
  }
  .col-xl-6 {
    &:last-child {
      padding: 0 15px;
      & > .row {
        background-color: ${(props) => props.theme.grayLight};
      }
    }
  }
`;
const HomeNew = (props) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "posts"),
        where("status", "==", postStatus.APPROVED),
        where("hot", "==", false),
        limit(4)
      );
      onSnapshot(q, (snapshot) => {
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
  return (
    <HomeNewStyle>
      <div className="container">
        <TitlePrimary>Latest Posts</TitlePrimary>
        <div className="row">
          <div className="col-xl-6">
            <HomeNewIntro data={postList[0]} />
          </div>
          <div className="col-xl-6">
            <div className="row">
              {Array.isArray(postList) &&
                postList.length > 0 &&
                postList
                  .slice(1)
                  .map((item) => <HomeNewItem key={item.id} data={item} />)}
            </div>
          </div>
        </div>
      </div>
    </HomeNewStyle>
  );
};

HomeNew.propTypes = {};

export default HomeNew;
