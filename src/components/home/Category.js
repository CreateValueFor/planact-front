import React from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { usePlans } from "../../modules/Plans/hook";

function Category() {
  const { filters } = usePlans();

  return (
    <div>
      <h2>분야</h2>
      <ListGroup variant="flush">
        {filters.map((filter, idx) => (
          <ListGroupItem key={idx}>
            <Button variant="white">{filter}</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default Category;
