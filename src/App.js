import React from "react";
import { Link, Route } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import "./app.css";
import Idea from "./views/Idea";
import Uploads from "./views/Uploads";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Calendar from "./components/home/Calendar";
import Profile from "./assets/img/Default Profile.png";
import CalenarLogo from "./assets/img/Calendar.svg";
import SearchLogo from "./assets/img/Search.svg";
import ColoredSearch from "./assets/img/coloredSearch.png";
import ColoredCalendar from "./assets/img/coloredCalendar.png";
import List from "./components/idea/List";

const StyledMobileTab = styled.div`
  background: #ffffff;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
  border-top: 1px solid #eee;
  justify-content: space-around;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  padding: 0.75rem 0px;
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: Caros Soft;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 0.75rem;
    text-decoration: none;
    letter-spacing: 0.02em;

    color: #363946;
    p {
      margin-top: 0.5rem;
    }
  }
`;

const StyledMobileTopBar = styled.div`
  height: 64px;
  padding: 1rem;
  position: fixed;
  top: 0;
`;

const StyledMobileBody = styled.div`
  margin-top: 64px;
  margin-bottom: 70px;
  height: calc(100vh - 134px);
  max-height: calc(100vh - 134px);
  .row {
    padding-right: 2rem;
    .col-lg-12 {
      /* padding-left: 0 !important; */
      padding-right: 1rem;
    }
  }
`;

function App() {
  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:798px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:797px)",
  });
  return (
    <div style={{ backgroundColor: "#fcfcfe", minHeight: "100vh" }}>
      {(isPc || isTablet) && (
        <div style={{ minHeight: "100vh" }}>
          <Route path="/trash" exact component={Home} />
          <Route path="/" component={Idea} />
          <Route path="/login" component={Login} />
          <Route path="/uploads" component={Uploads} />
        </div>
      )}
      {isMobile && (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(252, 252, 254)",
          }}
        >
          <StyledMobileTopBar>
            <img
              src={Profile}
              style={{ width: "32px", height: "32px" }}
              alt="profile"
            />
          </StyledMobileTopBar>
          <StyledMobileBody
            style={{ height: "calc(100% - 70px)", width: "100%" }}
          >
            <Route path="/" exact component={Calendar} />
            <Route path="/list" exact component={List} />
          </StyledMobileBody>
          <StyledMobileTab>
            <Link to="/">
              <img
                src={ColoredCalendar}
                style={{ width: "24px", height: "24px" }}
                alt="calendar"
              />
              <p>달력</p>
            </Link>
            <Link to="/list">
              <img
                src={ColoredSearch}
                style={{ width: "24px", height: "24px" }}
                alt="search"
              />
              <p>검색</p>
            </Link>
          </StyledMobileTab>
        </div>
      )}
    </div>
  );
}

export default App;
