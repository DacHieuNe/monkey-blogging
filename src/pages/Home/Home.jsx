import React from "react";
import { Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "@/firebase/firebase-config";
import { Layout } from "@/components/Layout";
import { HomeBanner, HomeFeaturePost, HomeNew, HomePost } from "@/modules/Home";

const Home = (props) => {
  return (
    <>
      <Layout>
        <HomeBanner />
        <HomeFeaturePost />
        <HomeNew />
        <HomePost />
      </Layout>
    </>
  );
};

Home.propTypes = {};

export default Home;
