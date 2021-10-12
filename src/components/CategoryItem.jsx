import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import { usePlans } from "../modules/Plans/hook";

function CategoryItem({ event, idx, setIsSideBarExist, category }) {
  const [checked, setChecked] = useState(false);

  const { getPlans, removePlans } = usePlans();
  const onClick = useCallback(
    (e) => {
      setChecked((prev) => {
        if (prev == true) {
          removePlans(category);
        } else {
          getPlans(category);
        }
        return !prev;
      });
    },
    [setChecked]
  );
  return (
    <ListGroupItem
      action
      key={idx}
      className="d-flex justify-content-between px-2 custom-list-item"
      onClick={onClick}
      style={{ border: "none" }}
    >
      <div className="d-flex">
        <div
          className="d-flex align-items-center justify-content-center mr-2 check-circle"
          style={{
            backgroundColor: checked ? "#313340" : "#fff",
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
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="ml-auto filter-btn"
        onClick={() => {
          setIsSideBarExist((prev) => !prev);
        }}
      />
    </ListGroupItem>
  );
}

export default React.memo(CategoryItem);
