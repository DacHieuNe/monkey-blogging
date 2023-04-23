import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import HomePostItem from "./HomePostItem";

const HomePostStyle = styled.div`
  margin-top: 40px;
  .container {
    & > .row {
      gap: 30px;
    }
  }
`;
const homePost = [
  {
    id: Math.floor(Math.random() * 10000000 + 1),
    title: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    tag: "Kiến thức",
    users: {
      fullname: "Andiez Le",
    },
    createdAt: {
      seconds: new Date().getTime(),
    },
    bg: "https://i.pinimg.com/736x/80/2b/94/802b946554f7a4f2a03c69012013adb4.jpg",
  },
  {
    id: Math.floor(Math.random() * 10000000 + 1),
    title: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    tag: "Kiến thức",
    users: {
      fullname: "Andiez Le",
    },
    createdAt: {
      seconds: new Date().getTime(),
    },
    bg: "https://i.pinimg.com/736x/80/2b/94/802b946554f7a4f2a03c69012013adb4.jpg",
  },
  {
    id: Math.floor(Math.random() * 10000000 + 1),
    title: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    tag: "Kiến thức",
    users: {
      fullname: "Andiez Le",
    },
    createdAt: {
      seconds: new Date().getTime(),
    },
    bg: "https://i.pinimg.com/736x/80/2b/94/802b946554f7a4f2a03c69012013adb4.jpg",
  },
  {
    id: Math.floor(Math.random() * 10000000 + 1),
    title: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    tag: "Kiến thức",
    users: {
      fullname: "Andiez Le",
    },
    createdAt: {
      seconds: new Date().getTime(),
    },
    bg: "https://i.pinimg.com/736x/80/2b/94/802b946554f7a4f2a03c69012013adb4.jpg",
  },
];
const HomePost = (props) => {
  return (
    <HomePostStyle>
      <div className="container">
        <div className="row">
          {Array.isArray(homePost) &&
            homePost.length > 0 &&
            homePost.map((item) => <HomePostItem width="primary" item={item} key={item.id} />)}
        </div>
      </div>
    </HomePostStyle>
  );
};

HomePost.propTypes = {};

export default HomePost;
