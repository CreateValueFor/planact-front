import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Index() {
  const [planList, setPlanList] = useState([
    {
      id: 0,
      title: "테스트",
      author: "이민기",
    },
  ]);
  return (
    <Row>
      <Col lg="12">
        {planList.map((plan) => (
          <div
            key={plan.id}
            style={{
              width: 80,
              height: 30,
              margin: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#089BAB",
              borderRadius: "15px",
            }}
          >
            {plan.title}
          </div>
        ))}
        <Link to="/uploads/summary">추가하기</Link>
      </Col>
    </Row>
  );
}

export default Index;
