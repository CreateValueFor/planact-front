import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
import CategoryItem from "../CategoryItem";

function PlanCategory({ setIsSideBarExist }) {
  const categories = ["stock", "지원사업", "exhibition", "스포츠", "입시"];
  return (
    <Card className="mt-3" style={{ overflowX: "scroll", height: "80vh" }}>
      <Card.Body>
        <ListGroup>
          {categories.map((event, idx) => (
            <CategoryItem
              event={event}
              idx={idx}
              setIsSideBarExist={setIsSideBarExist}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default React.memo(PlanCategory);
