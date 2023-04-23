import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Input } from "@/modules/Input";
import { IconSearch } from "@/components/Icon";
import { Button } from "@/components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const HeaderStyle = styled.header`
  padding: 20px;
  .header {
    &__logo {
      img {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }
    }
    &__list {
      display: flex;
    }
    &__link {
      display: inline-block;
      padding: 20px;
      color: #000;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      &--active {
        color: ${(props) => props.theme.primary};
      }
    }
    &__search {
      width: 340px;
      margin-right: 24px;
    }
    &__btn {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

const headerItem = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const Header = (props) => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const getName = () => {
    if (userInfo?.displayName) {
      const tamp = userInfo.displayName.split(" ");
      return tamp[tamp.length - 1];
    }
    return null;
  };
  return (
    <HeaderStyle>
      <div className="container">
        <div className="row items-center">
          <div className="col-xl-4">
            <div className="row items-center">
              <div className="header__logo">
                <NavLink to="/">
                  <img srcSet={`${logo} 1x ${logo} 2x`} src={logo} alt="logo" />
                </NavLink>
              </div>
              <nav className="header__nav">
                <ul className="header__list">
                  {Array.isArray(headerItem) &&
                    headerItem.length > 0 &&
                    headerItem.map((item) => (
                      <li className="header__item" key={item.title}>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "header__link header__link--active"
                              : "header__link"
                          }
                          to={item.url}
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="row items-center justify-end">
              <div className="header__search">
                <Input placeholder="Search here...">
                  <IconSearch />
                </Input>
              </div>
              <div className="header__btn">
                <Button
                  type="button"
                  height="56px"
                  className="header-button"
                  onClick={() =>
                    userInfo ? navigate("/dashboard") : navigate("/sign-in")
                  }
                >
                  {userInfo ? "Dashboard" : "Login"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyle>
  );
};

Header.propTypes = {};

export default Header;
