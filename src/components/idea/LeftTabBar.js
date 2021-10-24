import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
// import Logo from "../../assets/img/Subtract.png";
import Logo from "../../assets/img/testLogo.svg";
import Profile from "../../assets/img/Default Profile.png";
import { translateRect } from "@fullcalendar/common";
import { Link } from "react-router-dom";

const StyledTabItem = styled.div`
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

// function LeftTabBar

function LeftTabBar({ location }) {
  const [selectedTab, setSelectedTab] = useState("calendar");
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
  }, []);

  const selectTab = useCallback((e) => {
    const selected = e.target.innerHTML;
    if (selected === "리스트") {
      setSelectedTab("list");
    } else {
      setSelectedTab("calendar");
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
      <img
        src={Profile}
        className="mb-5"
        style={{ width: 50, height: 50 }}
        alt="logo"
      />
    </div>
  );
}

export default React.memo(LeftTabBar);
