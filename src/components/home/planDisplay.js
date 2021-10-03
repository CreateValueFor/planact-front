import React, { useEffect, useState } from "react";
import { Button, Card, Collapse, ListGroup } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { usePlans } from "../../modules/Plans/hook";

function PlanDisplay() {
  const { plans, currentPlans, filters, getPlans, makefilters } = usePlans();
  // console.log(plans);
  useEffect(() => {
    getPlans();
    // getPlans().then(() => {
    //   makefilters(currentPlans, "bank");
    //   console.log(filters);
    // });
  }, []);

  // console.log(plans);
  const [open, setOpen] = useState(false);

  return (
    <Card className="mt-3" style={{ overflowX: "scroll", height: "80vh" }}>
      <Card.Body>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="white"
        >
          공모주
        </Button>
        <Collapse in={open}>
          <ListGroup>
            {plans.events.map((stock, idx) => (
              <ListGroup.Item
                key={idx}
                className="d-flex justify-content-between"
              >
                <span style={{ fontSize: "1rem" }}>{stock.title}</span>
                <div className="d-flex">
                  <Button variant="white">
                    <FontAwesomeIcon icon={faEye} />
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </Button>
                  <Button variant="white">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Collapse>
      </Card.Body>
    </Card>
  );
}

export default PlanDisplay;
