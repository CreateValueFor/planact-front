import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
// import Logo from "../../assets/img/Subtract.png";
import Logo from "../../assets/img/testLogo.svg";

import Profile from "../../assets/img/Default Profile.png";
import { translateRect } from "@fullcalendar/common";
import { Link } from "react-router-dom";
import LoginModal from "../login/Login";
import RegisterModal from "../login/Register";
import useAuth from "../../modules/User/hook";
import AuthorizeButton from "./AuthorizeButton";
import AuthTab from "../login/AuthTab";
import CalenarLogo from "../../assets/img/Calendar.svg";
import SearchLogo from "../../assets/img/Search.svg";
import ColoredSearch from "../../assets/img/coloredSearch.png";
import ColoredCalendar from "../../assets/img/coloredCalendar.png";
import Avatar from "../../assets/img/user.svg"

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

const StyledBackgroundTab = styled(StyledTabItem)`
  z-index: 1;
  position: absolute;
  /* top: -100%; */
  background: #ffffff;
`;

const StyledLink = styled(Link)`
  z-index: 10;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: center;
  display: flex;
  flex-direction: column;
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
  img {
    margin-bottom: 1rem;
    width: 24px;
    height: 24px;
  }
`;

const StyledLoginModal = styled(LoginModal)``;

// function LeftTabBar
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

const RouterButtons = (props) => {
  const { selectedTab, setSelectedTab } = props;
  const selectTab = useCallback((string) => {
    if (string === "calendar") {
      setSelectedTab(false);
    } else {
      setSelectedTab(true);
    }
  }, []);
  return (
    <div className="mt-5" style={{ flex: 1, position: "relative" }}>
      <div style={{ position: "relative" }}>
        <StyledBackgroundTab
          selectedTab={selectedTab}
          style={
            selectedTab
              ? {
                  top: "100%",
                  transform: "translate(0, -100%)",
                }
              : {
                  top: "0",
                }
          }
        />
        <StyledTabItem
          name="calendar"
          onClick={() => {
            selectTab("calendar");
          }}
        >
          <StyledLink
            name="calendar"
            className={!selectedTab && "active"}
            to="/calendar"
          >
            <img
              src={!selectedTab ? ColoredCalendar : CalenarLogo}
              alt="calendarLogo"
            />
            <div>달력</div>
          </StyledLink>
        </StyledTabItem>
        <StyledTabItem
          name="list"
          onClick={() => {
            selectTab("list");
          }}
        >
          <StyledLink className={selectedTab && "active"} to="/list">
            <img
              src={selectedTab ? ColoredSearch : SearchLogo}
              alt="searchLogo"
            />
            <div>검색</div>
          </StyledLink>
        </StyledTabItem>
      </div>
    </div>
  );
};

const AuthMethodContainer = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const clickOutsidePopup = () => {
    setOpenLogin(false);
    setOpenRegister(false);
  };

  const clickAuth = useCallback((e) => {
    const type = e.target.innerText;
    e.stopPropagation();

    if (type === "로그인") {
      setOpenLogin((prev) => !prev);
      setOpenRegister(false);
    } else {
      setOpenRegister((prev) => !prev);
      setOpenLogin(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("click", clickOutsidePopup);
    return () => {
      window.removeEventListener("click", clickOutsidePopup);
    };
  }, []);
  return (
    <div className="mb-5">
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
    </div>
  );
};

const ProfileContainer = () => {
  const [authTab, setAuthTab] = useState(false);
  const clickProfile = useCallback((e) => {
    e.stopPropagation();
    setAuthTab((prev) => !prev);
  }, []);
  return (
    <>
      {/* <img
        src={Profile}
        className="mb-5"
        style={{ width: 50, height: 50, cursor: "pointer" }}
        alt="logo"
        onClick={clickProfile}
      /> */}
      <div onClick={clickProfile} className="mb-5" style={{cursor:"pointer",width:50,display:"flex",alignItems:"center",justifyContent:"center", height:50, borderRadius:"50%",background:"#d8d8d8"}}>
        <img src={Avatar} alt="avatar"/>
      </div>

      <AuthTab open={authTab} setAuthTab={setAuthTab} style={popUpStyle} />
    </>
  );
};

function LeftTabBar({ location }) {
  const { status } = useAuth();
  const [selectCalendar, setSelectCalendar] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2];

    switch (currentPath) {
      case "calendar":
        setSelectCalendar(false);
        break;
      case "list":
        setSelectCalendar(true);
        break;
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
        style={{ width: 30, height: 44 }}
        alt="logo"
      />
      <RouterButtons
        selectedTab={selectCalendar}
        setSelectedTab={setSelectCalendar}
      />
      {status ? <ProfileContainer /> : <AuthMethodContainer />}
    </div>
  );
}

export default React.memo(LeftTabBar);
