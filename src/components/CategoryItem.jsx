import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import { usePlans } from "../modules/Plans/hook";

function CategoryItem({ event, idx, setIsSideBarExist }) {
  const [checked, setChecked] = useState(false);

  const { getPlans, removePlans } = usePlans();
  const onClick = useCallback(
    (e) => {
      setChecked((prev) => {
        if (prev == true) {
          removePlans(event);
        } else {
          getPlans(event);
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
      className="d-flex justify-content-between"
      onClick={onClick}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          border: "3px solid black",
          width: 22,
          height: 22,
          borderRadius: "50%",
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
