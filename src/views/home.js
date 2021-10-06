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

function Home() {
  const [login, setLogin] = useState(false);

  const [register, setRegister] = useState(false);

  const [isSideBarExist, setIsSideBarExist] = useState(false);
  return (
    <Container fluid>
      <Row>
        <Col lg="9">
          <Row>
            <img src={Logo} style={{ width: 24, height: 24 }} alt="logo" />
            {/* <img src="../assets/img/Subtract.png" /> */}
          </Row>
          <Row>
            <Col lg="3" style={{ position: "relative" }}>
              <Login setLogin={setLogin} setRegister={setRegister} />
              {login && <LoginModal setLogin={setLogin} />}
              {register && <RegisterModal setRegister={setRegister} />}
              <PlanCategory />
              {/* <PlanDisplay /> */}
            </Col>
            <Col lg="9">
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
