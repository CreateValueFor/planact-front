import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Search from "./Search";
import Filter from "./Filter";
import PlanList from "./PlanList";
import Pagination from "./Pagination";
import useResponsive from "../../Responsive";
import useViews from "../../modules/View/hooks";

function List({ history }) {
  const { isMobile } = useResponsive();
  const { changeView } = useViews();
  useEffect(() => {
    changeView("list");
  }, []);
  return (
    <Container fluid>
      <Row
        className={`w-100 ${isMobile && "m-0"}`}
        style={{ paddingRight: isMobile ? "0px" : "2rem", height: "100%" }}
      >
        <Col
          lg="12"
          className={`${isMobile && "p-0"}`}
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
