import React, { useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import sampleData from "../../dummy/oh.a_sis";
import { usePlans } from "../../modules/Plans/hook";

function DailyUpload() {
  //plan daily inputs
  let nextId = useRef(0);
  const [daySummary, setDaySummary] = useState([]);
  const [theme, setTheme] = useState("");
  const [contents, setContents] = useState("");
  const [dailythumb, setDailyThumb] = useState("#");
  const [dailyThumbFile, setDailyThumbFile] = useState();
  const dailyThumbInput = useRef();
  //dummydata
  const data = sampleData();
  const { uploadDailyPlan } = usePlans();

  //usePlans
  const uploadDaily = (e) => {
    e.preventDefault();
    uploadDailyPlan(daySummary);
  };

  const onThemeSubmit = (e) => {
    e.preventDefault();
    nextId.current += 1;
    setDaySummary([
      ...daySummary,
      {
        id: nextId.current,
        title: theme,
        contents: contents,
        thumb: dailyThumbFile,
      },
    ]);
    dailyThumbInput.current.value = null;
    setDailyThumb("#");
    console.log("daysummary is ", daySummary);
  };

  const handleDailyInput = (e) => {
    const { name, value } = e.target;
    console.log(name);
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

  return (
    <Row>
      <Col lg="6">
        <h3>플랜 개요</h3>
        <div style={{ display: "flex" }}>
          {data.map((day, index) => (
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {daySummary.map((day) => (
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
