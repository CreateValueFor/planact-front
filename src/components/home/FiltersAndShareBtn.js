import React, { useCallback, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ICalendarLink from "react-icalendar-link";
import { Link } from "react-router-dom";
import { usePlans } from "../../modules/Plans/hook";
import "./filterAndShareBtn.scss";
const ics = require("ics");

function FiltersAndShareBtn({ setIsSideBarExist }) {
  const { plans, currentPlans, filters, makefilters } = usePlans();

  const { error, value } = ics.createEvents([
    {
      title: "test",
      start: [2018, 1, 15, 9, 0],
      duration: { minutes: 45 },
      description: "TEst",
    },
    {
      title: "ttttt",
      start: [2018, 1, 15, 12, 15],
      duration: { hours: 1, minutes: 30 },
    },
  ]);
  const makeDownloadURL = () => {};
  const file = new Blob([value], { type: "text/calendar;charset=utf-8" });
  const path = window.URL.createObjectURL(file);
  const onClick = () => {
    window.open("data:text/calendar;charset=utf8," + escape(value));
  };

  const onSideBarToggle = useCallback(() => {
    setIsSideBarExist((prev) => !prev);
  }, [setIsSideBarExist]);
  return (
    <Row className="my-3 ">
      <Col lg="6">
        {/* <Button
          variant="outline-white"
          className="mainBtn w-100"
          onClick={onSideBarToggle}
        >
          필터
        </Button> */}
      </Col>
      <Col lg="6" style={{ display: "flex", justifyContent: "right" }}>
        <Button
          className="mainBtn ml-auto"
          variant="outline-white"
          onClick={onClick}
          style={{
            textDecoration: "none",
            color: "#FFF",
            background: "#313340",
            borderRadius: "100px",
            width: 150,
          }}
        >
          <a
            href={path}
            download={"download.ics"}
            style={{
              textDecoration: "none",
              color: "#FFF",
            }}
          >
            일정 다운로드
          </a>
        </Button>
      </Col>
    </Row>
  );
}

export default FiltersAndShareBtn;
