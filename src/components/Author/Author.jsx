import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

const AuthorStyle = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
  display: flex;
  column-gap: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.grayF3};
  .author {
    &-image {
      max-width: 400px;
      height: auto;
      object-fit: cover;
      img {
        border-radius: 10px;
      }
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 24px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    flex-direction: column;
  }
`;
const Author = ({ userId }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const docRef = doc(db, "users", userId);
    onSnapshot(docRef, (docData) => {
      setUser({
        id: docData.id,
        ...docData.data(),
      });
    });
  }, []);
  if (!user.fullname) return null;
  return (
    <AuthorStyle>
      <div className="author-image">
        <img src={user && user["image_link"]} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user?.fullname}</h3>
        <p className="author-desc">{user?.description}</p>
      </div>
    </AuthorStyle>
  );
};

Author.propTypes = {};

export default Author;
