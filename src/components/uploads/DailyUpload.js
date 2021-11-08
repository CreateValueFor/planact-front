import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";

import { usePlans } from "../../modules/Plans/hook";

function DailyUpload({ location }) {
  //plan json file
  const [planList, setPlanList] = useState([]);

  //plan daily inputs
  const [dayTitle, setDayTitle] = useState("");
  let nextId = useRef(0);
  let nextJsonId = useRef(0);
  const [daySummary, setDaySummary] = useState({ title: "", events: [] });
  const [theme, setTheme] = useState("");
  const [contents, setContents] = useState("");
  const [dailythumb, setDailyThumb] = useState("#");
  const [dailyThumbFile, setDailyThumbFile] = useState();
  const dailyThumbInput = useRef();
  //dummydata

  const planId = location.search.split("=")[1];
  const { uploadDailyPlan, getUploadedPlansJson } = usePlans();

  //usePlans
  const uploadDaily = useCallback(
    (e) => {
      e.preventDefault();
      if (!daySummary.events.length) {
        window.alert("루틴을 입력해주세요");
        return;
      }
      nextJsonId.current += 1;
      setDaySummary({
        ...daySummary,
        id: nextJsonId.current,
        title: dayTitle,
      });
      uploadDailyPlan(daySummary, planId);
      getUploadedPlansJson(planId).then((data) => setPlanList(data));
      setDayTitle("");
      setTheme("");
      setContents("");
      console.log(planList.length);
    },
    [nextJsonId, dayTitle, daySummary, planId]
  );

  const onThemeSubmit = useCallback(
    (e) => {
      e.preventDefault();
      nextId.current += 1;
      setDaySummary({
        title: dayTitle,

        events: [
          ...daySummary.events,
          {
            id: nextId.current,
            title: theme,
            contents: contents,
            thumb: dailyThumbFile,
          },
        ],
      });
      dailyThumbInput.current.value = null;
      setDailyThumb("#");
      console.log("daysummary is ", daySummary);
    },
    [planList, dayTitle, nextId, theme, contents, dailyThumbFile]
  );

  const handleDayTitleInput = (e) => {
    const { name, value } = e.target;
    setDayTitle(value);
  };

  const handleDailyInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "theme":
        setTheme(value);
        break;
      case "contents":
        setContents(value);
        break;
      case "dailythumb":
        const file = e.target.files[0];
        setDailyThumbFile(file);
        console.log(file);
        setDailyThumb(URL.createObjectURL(file));
        break;
    }
  };

  useEffect(() => {
    getUploadedPlansJson(planId).then((data) => {
      if (!data) {
        nextJsonId.current = 0;
      } else {
        nextJsonId.current = data.length;
        setPlanList(data);
      }
      setDaySummary({
        ...daySummary,
        id: nextJsonId.current,
        title: dayTitle,
      });
    });
  }, []);

  return (
    <Row>
      <Col lg="6">
        <h3>플랜 개요</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {planList.map((day, index) => (
            <div
              key={index}
              style={{
                width: 100,
                height: 100,
                margin: 10,
                background: "red",
              }}
            >
              <p>제목 {day.title}</p>
            </div>
          ))}
        </div>
      </Col>
      <Col lg="6">
        <h3>하루 업로드</h3>
        <h4>하루 대제목</h4>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="하루 약칭"
            aria-label="Username"
            onChange={handleDayTitleInput}
            value={dayTitle}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {daySummary.events.map((day) => (
            <div
              key={day.id}
              style={{
                width: 80,
                height: 30,
                margin: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#adc3fe",
                borderRadius: "15px",
              }}
            >
              {day.title}
            </div>
          ))}
        </div>

        <Form onSubmit={onThemeSubmit}>
          <div className="d-flex justify-content-around">
            <Image
              src={dailythumb}
              rounded
              style={{ width: "160px", height: "90px" }}
            />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>썸네일 업로드</Form.Label>
              <Form.Control
                type="file"
                name="dailythumb"
                ref={dailyThumbInput}
                onChange={handleDailyInput}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>소주제</Form.Label>
            <Form.Control
              onChange={handleDailyInput}
              type="text"
              name="theme"
              placeholder="주제를 입력해주세요(시간 or 부위)"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleDailyInput}
              name="contents"
              rows={8}
              placeholder="내용을 입력해주세요"
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="primary" type="submit" style={{ marginRight: 30 }}>
              소주제 추가
            </Button>
            <Button variant="primary" type="button" onClick={uploadDaily}>
              날짜 업로드
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default React.memo(DailyUpload);
