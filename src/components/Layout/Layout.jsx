import React from "react";
import PropTypes from "prop-types";
import { Header } from "@/components/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
