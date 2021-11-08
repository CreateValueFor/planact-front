import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePlans } from "../../modules/Plans/hook";

function Index({ location }) {
  const [planList, setPlanList] = useState([
    {
      id: 0,
      title: "테스트",
      author: "이민기",
    },
  ]);
  const { getUploadedPlans, uploads } = usePlans();

  useEffect(() => {
    const curPlanList = getUploadedPlans();

    console.log(uploads);
  }, []);
  return (
    <Row className="mb-3">
      <Col lg="12">
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {uploads.map((plan) => (
              <Link
                to={`/uploads?id=${plan.id}`}
                key={plan.id}
                style={{
                  width: 300,
                  height: 100,
                  margin: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    plan.id == location.search.split("=")[1]
                      ? "#FFB350"
                      : "#089BAB",
                  borderRadius: "15px",
                  color: "black",
                }}
              >
                <div>제목 : {plan.title}</div>
                <div>작성자 : {plan.author}</div>
                <div>SNS : {plan.sns}</div>
                <div>카테고리 : {plan.category}</div>
              </Link>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default React.memo(Index);
