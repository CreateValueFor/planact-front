import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router";
import styled from "styled-components";
import Calendar from "../components/home/Calendar";
import Inquiry from "../components/idea/Inquiry";
import InquiryTab from "../components/idea/InquiryTab";
import LeftTabBar from "../components/idea/LeftTabBar";
import List from "../components/idea/List";
import PlanDetail from "../components/idea/PlanDetail";
import "./Idea.scss";

const StyledMainTemplate = styled.div`
  padding-left: 3rem;
  padding-right: 2rem;
  display: flex;
  flex: 1;
  height: 100%;
  width: 1000%;
  background: #ffffff;
  border-radius: 136px 0px 0px 0px;
`;

const InquiryMenu = () => {
  return (
    <Col lg="2">
      <InquiryTab />
    </Col>
  );
};

function Idea({ location }) {
  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        // maxHeight: "100vh",
        backgroundColor: "#F1F6F9",
        display: "flex",
      }}
    >
      <Row style={{ flex: 1, display: "flex" }}>
        <Col lg="1" style={{ paddingLeft: "0px", flexBasis: "130px" }}>
          <LeftTabBar location={location} />
        </Col>
        <Route path="/inquiry" component={InquiryMenu} />
        <Col
          lg="10"
          style={{
            display: "flex",
            flex: 1,
            paddingRight: 0,
            paddingLeft: "calc(var(--bs-gutter-x) * 1)",
          }}
        >
          <StyledMainTemplate className="pt-5 pl-5">
            <Route path="/" exact component={Calendar} />
            <Route path="/calendar" exact component={Calendar} />
            <Route path="/list" exact component={List} />
            <Route path="/list/:id" component={PlanDetail} />
            <Route path="/inquiry" component={Inquiry} />
          </StyledMainTemplate>
        </Col>
      </Row>
    </Container>
  );
}

export default Idea;
