import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const AuthenStyle = styled.div`
  margin-top: 20px;
  .authen {
    &-thumbnail {
      text-align: center;
      margin-bottom: 24px;
      img {
        display: inline-block;
        width: 100px;
        height: 100px;
        object-fit: contain;
      }
    }
    &-title {
      margin-bottom: 24px;
      color: ${(props) => props.theme.primary};
      text-align: center;
      font-size: 32px;
      font-weight: 600;
    }
    &-check {
      max-width: 650px;
      margin: 20px auto;
      a {
        display: inline-block;
        color: ${(props) => props.theme.primary};
      }
    }
  }
`;
const Authen = ({ children }) => {
  return (
    <AuthenStyle>
      <div className="container">
        <div className="authen-thumbnail">
          <NavLink to="/">
            <img srcSet="logo.png 1x logo.png 2x" alt="monkey" src="logo.png" />
          </NavLink>
        </div>
        <h3 className="authen-title">Monkey Blogging</h3>
        {children}
      </div>
    </AuthenStyle>
  );
};

Authen.propTypes = {};

export default Authen;
