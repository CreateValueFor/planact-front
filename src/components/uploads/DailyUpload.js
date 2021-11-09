import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import uniqueString from "unique-string";
import { Link } from "react-router-dom";
import { usePlans } from "../../modules/Plans/hook";

function imageBase64(base64) {
  const imageString = `data:image; base64,${base64.img}`;
  return imageString;
}

function DetailModal({ modalContents, show, setShow }) {
  const { getDailyPlanImg, deleteDailyPlan } = usePlans();
  const [imageBuffers, setImageBuffers] = useState([]);
  const handleClose = () => setShow(false);
  const { title, events } = modalContents;
  let imageList = [];
  useEffect(
    () => {
      events.map((data) => {
        imageList.push(data.thumb);
      });
      getDailyPlanImg(imageList).then((data) => {
        console.log(data);
        setImageBuffers(data);
      });
    },
    [modalContents]
  );
  const deletePlans = () => {
    const planID = window.location.search.split("=")[1];
    const dailyID = modalContents.id;
    deleteDailyPlan(planID, dailyID);
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {events.map((data, index) => (
            <div key={index}>
              <h5>{data.title}</h5>
              <div>{data.contents}</div>
              {imageBuffers.map((base64, idx) => {
                if (base64.name == data.thumb) {
                  return (
                    <img
                      style={{ width: 160, height: 90 }}
                      key={idx}
                      src={imageBase64(base64)}
                      alt=""
                    />
                  );
                }
              })}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deletePlans}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DailyUpload({ location }) {
  //Modal conrol
  const [show, setShow] = useState(false);
  const [modalContents, setModalContents] = useState({ title: "", events: [] });
  const [imageBuffers, setImageBuffers] = useState([]);
  const handleShow = () => setShow(true);

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
  const [imageList, setImageList] = useState([]);
  const dailyThumbInput = useRef();
  //dummydata

  const planId = location.search.split("=")[1];
  const {
    uploadDailyPlan,
    getUploadedPlansJson,
    uploadDailyPlanImg,
  } = usePlans();

  //usePlans
  const uploadDaily = useCallback(
    (e) => {
      e.preventDefault();
      if (!daySummary.events.length) {
        window.alert("루틴을 입력해주세요");
        return;
      }

      const ImageForm = new FormData();
      imageList.map((data) => {
        ImageForm.append(data.name, data.img);
      });
      ImageForm.append("thumb", imageList);
      uploadDailyPlanImg(ImageForm);
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
    },
    [nextJsonId, dayTitle, daySummary, planId]
  );

  const onThemeSubmit = useCallback(
    (e) => {
      e.preventDefault();
      nextId.current += 1;
      const uuid = uniqueString();
      let ext;
      if (dailyThumbFile) {
        ext = dailyThumbFile.name.split(".")[1];
        setImageList([...imageList, { name: uuid, img: dailyThumbFile }]);
      }
      setDaySummary({
        title: dayTitle,
        id: nextJsonId.current,
        events: [
          ...daySummary.events,
          {
            id: nextId.current,
            title: theme,
            contents: contents,
            thumb: uuid + "." + ext,
          },
        ],
      });
      dailyThumbInput.current.value = null;
      setDailyThumb("#");
      console.log("image list is ", imageList);
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

  const updateUploadedJson = () => {
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
  };

  useEffect(() => {
    updateUploadedJson();
  }, []);

  return (
    <Row>
      <DetailModal
        show={show}
        setShow={setShow}
        modalContents={modalContents}
      />
      <Col lg="6">
        <Link
          to="/uploads"
          style={{
            display: "inline-block",
            color: "blue",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          뒤로가기
        </Link>
        <h3>플랜 개요</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {planList.map((day, index) => (
            <div
              key={index}
              onClick={() => {
                handleShow();
                setModalContents(day);
                console.log(day);
              }}
              style={{
                width: 100,
                height: 100,
                margin: 10,
                background: "red",
                cursor: "pointer",
              }}
            >
              <p>{day.title}</p>
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
