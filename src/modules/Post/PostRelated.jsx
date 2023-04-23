import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TitlePrimary } from "@/modules/Title";
import { HomePostItem } from "@/modules/Home";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

const PostRelated = ({ categoryID = "" }) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("category.id", "==", categoryID)
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
  }, []);
  console.log("postList", postList);
  return (
    <div className="post-related">
      <TitlePrimary>Bài viết liên quan</TitlePrimary>
      <div className="grid-layout grid-layout--primary">
        {Array.isArray(postList) &&
          postList.length > 0 &&
          postList.map((post) => <HomePostItem key={post.id} item={post} />)}
        {/* <HomePostItem
          item={{
            id: Math.floor(Math.random() * 10000000 + 1),
            title:
              "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
            tag: "Kiến thức",
            users: {
              fullname: "Andiez Le",
            },
            createdAt: {
              seconds: new Date().getTime(),
            },
            bg: "https://i.pinimg.com/736x/80/2b/94/802b946554f7a4f2a03c69012013adb4.jpg",
          }}
          width=""
        ></HomePostItem> */}
      </div>
    </div>
  );
};

PostRelated.propTypes = {};

export default PostRelated;
