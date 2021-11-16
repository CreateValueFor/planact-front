import React from "react";
import { Col, Row } from "react-bootstrap";
import Search from "./Search";
import Filter from "./Filter";
import PlanList from "./PlanList";
import Pagination from "./Pagination";

function List({ history }) {
  return (
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
  );
}

export default List;
