import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Search from "./Search";
import Filter from "./Filter";
import PlanList from "./PlanList";
import Pagination from "./Pagination";

function List({ history }) {
  return (
    <Container fluid>
      <Row className="w-100">
        <Col
          lg="12"
          style={{ display: "flex", flexDirection: "column", paddingRight: 0 }}
        >
          <Search />

          <PlanList history={history} />
          <Pagination />
        </Col>
      </Row>
    </Container>
  );
}

export default List;
