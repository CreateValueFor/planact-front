import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
import CategoryItem from "../CategoryItem";
import "./PlanCategory.scss";
function PlanCategory({ setIsSideBarExist }) {
  const categories = [
    {
      name: "공모주",
      category: "stock",
    },
    {
      name: "지원사업",
      category: "venture",
    },
    {
      name: "전시회",
      category: "exhibition",
    },
    {
      name: "스포츠",
      category: "sports",
    },
    {
      name: "입시",
      category: "college",
    },
  ];
  // const categories = ["stock", "지원사업", "exhibition", "스포츠", "입시"];
  return (
    <Card className="my-3" style={{ flex: 1 }}>
      <Card.Body>
        <div className="text-muted card-custom-header mb-3 px-2">공식 일정</div>
        <ListGroup variant="flush">
          {categories.map((event, idx) => (
            <CategoryItem
              key={idx}
              event={event.name}
              category={event.category}
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
