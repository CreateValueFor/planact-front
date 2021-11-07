import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router";
import DailyUpload from "../components/uploads/DailyUpload";
import Index from "../components/uploads/Index";
import SummaryUpload from "../components/uploads/SummaryUpload";

function Uploads() {
  //plan Total

  return (
    <Container>
      <Route path="/uploads" exact component={Index} />
      <Route path="/uploads/summary" component={SummaryUpload} />
      <hr />
      <Route path="/uploads/summary" component={DailyUpload} />
    </Container>
  );
}

export default Uploads;
