import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "@/components/Button";
import monkeybanner from "@/assets/monkey-banner.jpg";

const HomeBannerStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  color: #fff;
  background-image: url(${(props) => props.monkeybanner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .title {
    margin: 0 0 24px;
    font-size: 32px;
    font-weight: 600;
  }
  .paragraph {
    margin: 0 0 30px;
    max-width: 500px;
    line-height: 1.7;
    font-size: 16px;
  }
  .btn {
    background-image: initial;
    background-color: #fff;
    span {
      color: transparent;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.subColor}
      );
      background-position: center;
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
`;
const HomeBanner = (props) => {
  return (
    <HomeBannerStyle monkeybanner={monkeybanner}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h3 className="title">Monkey Blogging</h3>
            <p className="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button type="button" className="btn">
              <span>Get Started</span>
            </Button>
          </div>
        </div>
      </div>
    </HomeBannerStyle>
  );
};

HomeBanner.propTypes = {};

export default HomeBanner;
