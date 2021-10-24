import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router";
import styled from "styled-components";
import Calendar from "../components/home/Calendar";
import LeftTabBar from "../components/idea/LeftTabBar";
import List from "../components/idea/List";
import "./Idea.scss";

const StyledMainTemplate = styled.div`
  padding-left: 3rem;
  display: flex;
  flex: 1;
  height: 100%;
  width: 1000%;
  background: #ffffff;
  border-radius: 136px 0px 0px 0px;
`;

function Idea({ location }) {
  return (
    <Container fluid style={{ minHeight: "100vh", backgroundColor: "#F1F6F9" }}>
      <Row style={{ minHeight: "100vh" }}>
        <Col lg="1" style={{ paddingLeft: "0px" }}>
          <LeftTabBar location={location} />
        </Col>
        <Col lg="11" style={{ display: "flex", flex: 1 }}>
          <StyledMainTemplate className="pt-5 pl-5">
            <Route path="/idea/calendar" exact component={Calendar} />
            <Route path="/idea/list" component={List} />
          </StyledMainTemplate>
        </Col>
      </Row>
    </Container>
  );
}

export default Idea;