import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
// import Logo from "../../assets/img/Subtract.png";
import Logo from "../../assets/img/testLogo.svg";

import Profile from "../../assets/img/Default Profile.png";
import { translateRect } from "@fullcalendar/common";
import { Link } from "react-router-dom";
import LoginModal from "../login/Login";
import RegisterModal from "../login/Register";

import CalenarLogo from "../../assets/img/Calendar.svg";
import AuthorizeButton from "./AuthorizeButton";
import AuthTab from "../login/AuthTab";

export const StyledTabItem = styled.div`
  z-index: 2;
  width: 85px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 46.5px;
  cursor: pointer;
  color: #fff;
  transition: 0.5s;
  background: transparent;
`;

const StyledLink = styled(Link)`
  z-index: 10;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fff;
  &:hover {
    color: inherit;
  }
  &.active {
    color: #089bab;
  }
`;

const StyledLoginModal = styled(LoginModal)``;

// function LeftTabBar

function LeftTabBar({ location }) {
  const [selectedTab, setSelectedTab] = useState("calendar");
  const [authTab, setAuthTab] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  console.log(openLogin);
  const popUpStyle = {
    position: "absolute",
    bottom: "10px",
    left: "calc(100% + 10px)",
    width: "300px",
    zIndex: 10,
    background: "#FFFFFF",
    boxShadow:
      "0px 0px 1px rgba(0, 0, 0, 0.25), 0px 0px 16px rgba(0, 0, 0, 0.15)",
    borderRadius: "12px",
  };
  const clickOutsidePopup = () => {
    setOpenLogin(false);
    setOpenRegister(false);
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2];

    switch (currentPath) {
      case "calendar":
        setSelectedTab("calendar");
        break;
      case "list":
        setSelectedTab("list");
        break;
    }
    window.addEventListener("click", clickOutsidePopup);
    return () => {
      window.removeEventListener("click", clickOutsidePopup);
    };
  }, []);

  const selectTab = useCallback((e) => {
    const selected = e.target.innerHTML;

    if (selected === "리스트") {
      setSelectedTab("list");
    } else {
      setSelectedTab("calendar");
    }
  }, []);

  const clickProfile = useCallback(() => {
    setAuthTab((prev) => !prev);
  }, []);

  const clickAuth = useCallback((e) => {
    const type = e.target.innerText;
    e.stopPropagation();
    console.log(type);
    if (type === "로그인") {
      setOpenLogin((prev) => !prev);
      setOpenRegister(false);
    } else {
      setOpenRegister((prev) => !prev);
      setOpenLogin(false);
    }
  }, []);

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "#089BAB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.05)",
        borderRadius: "0px 30px 0px 0px",
        position: "relative",
      }}
    >
      <img
        src={Logo}
        className="mt-5"
        style={{ width: 42, height: 62 }}
        alt="logo"
      />
      <div className="mt-5" style={{ flex: 1, position: "relative" }}>
        <div style={{ position: "relative" }}>
          <StyledTabItem
            style={
              selectedTab === "list"
                ? {
                    zIndex: 1,
                    position: "absolute",
                    background: "#ffffff",
                    top: "100%",
                    transform: "translate(0, -100%)",
                  }
                : {
                    zIndex: 1,
                    position: "absolute",
                    background: "#ffffff",
                    top: "0",
                  }
            }
          />
          <StyledTabItem name="calendar" onClick={selectTab}>
            <StyledLink
              className={selectedTab === "calendar" && "active"}
              to="/idea/calendar"
              style={{ zIndex: 10 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5159 21.0319C13.0398 21.0319 15.3533 20.138 17.1725 18.6553L22.2097 23.6924C22.6198 24.1025 23.2823 24.1025 23.6924 23.6924C24.1025 23.2823 24.1025 22.6198 23.6924 22.2097L18.6553 17.1725C20.138 15.3638 21.0319 13.0398 21.0319 10.5159C21.0319 4.71114 16.3207 0 10.5159 0C4.71114 0 0 4.71114 0 10.5159C0 16.3207 4.71114 21.0319 10.5159 21.0319ZM10.5159 18.9287C15.164 18.9287 18.9287 15.164 18.9287 10.5159C18.9287 5.86789 15.164 2.10319 10.5159 2.10319C5.86789 2.10319 2.10319 5.86789 2.10319 10.5159C2.10319 15.164 5.86789 18.9287 10.5159 18.9287Z"
                  fill="white"
                />
              </svg>
              <img
                src={CalenarLogo}
                className="mb-5"
                style={{ width: 50, height: 50, color: "rgb(8, 155, 171)" }}
                alt="logo"
                onClick={clickProfile}
              />
              달력
            </StyledLink>
          </StyledTabItem>
          <StyledTabItem name="list" onClick={selectTab}>
            <StyledLink
              className={selectedTab === "list" && "active"}
              to="/idea/list"
              style={{}}
            >
              리스트
            </StyledLink>
          </StyledTabItem>
        </div>
      </div>
      <AuthorizeButton
        clickAuth={clickAuth}
        openLogin={openLogin}
        openRegister={openRegister}
      />

      <StyledLoginModal
        style={popUpStyle}
        open={openLogin}
        setLogin={setOpenLogin}
      />

      <RegisterModal
        style={popUpStyle}
        open={openRegister}
        setRegister={setOpenRegister}
      />

      <img
        src={Profile}
        className="mb-5"
        style={{ width: 50, height: 50, cursor: "pointer" }}
        alt="logo"
        onClick={clickProfile}
      />

      <AuthTab open={authTab} style={popUpStyle} />
    </div>
  );
}

export default React.memo(LeftTabBar);
