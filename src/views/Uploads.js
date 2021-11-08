import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router";
import DailyUpload from "../components/uploads/DailyUpload";
import Index from "../components/uploads/Index";
import SummaryUpload from "../components/uploads/SummaryUpload";

function Uploads() {
  return (
    <Container>
      <Route path="/uploads" exact component={SummaryUpload} />
      <Route path="/uploads" exact component={Index} />
      <Route path="/uploads/daily" component={DailyUpload} />
    </Container>
  );
}

export default Uploads;
