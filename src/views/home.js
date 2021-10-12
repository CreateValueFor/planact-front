import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Calendar from "../components/home/Calendar";
import Filter from "../components/home/filter";
import PlanDisplay from "../components/home/planDisplay";
import Search from "../components/home/search";
import Logo from "../assets/img/Subtract.png";
import Login from "../components/home/login";
import FiltersAndShareBtn from "../components/home/FiltersAndShareBtn";
import LoginModal from "../components/login/Login";
import Profile from "../components/login/Profile";
import PlanCategory from "../components/home/PlanCategory";
import RegisterModal from "../components/login/Register";
import useAuth from "../modules/User/hook";

function Home() {
  const [login, setLogin] = useState(false);
  const { status } = useAuth();
  const [register, setRegister] = useState(false);

  const [isSideBarExist, setIsSideBarExist] = useState(false);
  return (
    <Container fluid>
      <Row style={{ height: "100px" }}>
        <Col lg="12" style={{ paddingLeft: "2rem", paddingTop: "2rem" }}>
          <img src={Logo} style={{ width: 30, height: 45 }} alt="logo" />
          <span
            style={{
              fontFamily: "Montserrat",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "12px",
              color: "#3882EB",
              verticalAlign: "bottom",
            }}
          >
            PLANACT
          </span>
        </Col>
      </Row>
      <Row style={{ minHeight: "calc(100vh - 100px)" }}>
        <Col lg="12">
          <Row style={{ height: "100%" }}>
            <Col
              lg="2"
              style={{
                position: "relative",
                width: "19.16666%",
                marginLeft: "1rem",
                marginRight: "2rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!status ? (
                <Login setLogin={setLogin} setRegister={setRegister} />
              ) : (
                <Profile />
              )}
              {login && <LoginModal setLogin={setLogin} />}
              {register && <RegisterModal setRegister={setRegister} />}
              <PlanCategory setIsSideBarExist={setIsSideBarExist} />
            </Col>
            <Col
              lg="10"
              className="pl-lg-4"
              style={{
                flex: 1,
                paddingLeft: "0.33333%",
                paddingRight: 0,
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <Search /> */}
              {/* <FiltersAndShareBtn setIsSideBarExist={setIsSideBarExist} /> */}
              <Calendar />
            </Col>
            {isSideBarExist && (
              <Col
                lg="3"
                style={{
                  width: "20%",
                  marginTop: -100,
                  paddingTop: 110,
                  backgroundColor: "#Fff",
                }}
              >
                <Filter />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
