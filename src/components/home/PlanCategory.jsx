import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";

function PlanCategory() {
  const categories = ["공모주", "지원사업", "전시회", "스포츠", "입시"];
  return (
    <Card className="mt-3" style={{ overflowX: "scroll", height: "80vh" }}>
      <Card.Body>
        <ListGroup>
          {categories.map((event, idx) => (
            <ListGroupItem
              action
              key={idx}
              className="d-flex justify-content-between"
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  border: "3px solid black",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: "#313340",
                }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    color: "#fff",
                    height: 13,
                    width: 13,
                  }}
                />
              </div>
              <div>{event}</div>
              <FontAwesomeIcon
                icon={faBars}
                className="ml-auto"
                onMouseEnter={() => {
                  console.log("hover");
                }}
                onMouseLeave={() => {
                  console.log("hover");
                }}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default PlanCategory;
