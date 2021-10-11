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
      <Row>
        <Col lg="12">
          <img src={Logo} style={{ width: 24, height: 24 }} alt="logo" />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Row>
            <Col
              lg="2"
              style={{
                position: "relative",
                width: "19.16666%",
                marginLeft: "1rem",
                marginRight: "2rem",
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
              style={{ width: "73%", paddingLeft: "0.33333%" }}
            >
              {/* <Search /> */}
              <FiltersAndShareBtn setIsSideBarExist={setIsSideBarExist} />
              <Calendar />
            </Col>
          </Row>
        </Col>
        {isSideBarExist && (
          <Col lg="3">
            <Filter />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Home;
