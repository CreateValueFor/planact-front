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
import { Link } from "react-router-dom";
import { usePlans } from "../../modules/Plans/hook";

function DailyUpload({ location, history }) {
  //plan json file
  const [planList, setPlanList] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(-1);

  //plan daily inputs
  const [editMode, setEditMode] = useState(0);
  const [dayTitle, setDayTitle] = useState("");
  let nextId = useRef(0);
  let nextJsonId = useRef(0);
  const [daySummary, setDaySummary] = useState({ title: "", events: [] });
  const [theme, setTheme] = useState("");
  const [contents, setContents] = useState("");
  const [dailythumb, setDailyThumb] = useState("");
  const [confirmUpload, setConfirmUpload] = useState(0);

  const dailyThumbInput = useRef();

  const planId = location.search.split("=")[1];
  const { uploadDailyPlan, getUploadedPlansJson, updateDailyPlan } = usePlans();

  //데일리 플랜 클릭 시 수정 창 보여줌
  const clickDailyPlan = () => {};
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
        title: dayTitle,
        id: nextJsonId.current,
      });
      setConfirmUpload((prev) => ++prev);
    },
    [nextJsonId, daySummary, planId]
  );

  useEffect(
    () => {
      if (daySummary.id && confirmUpload !== 0) {
        uploadDailyPlan(daySummary, planId).then(() => {
          updateUploadedJson();
        });
        setDayTitle("");
        setTheme("");
        setContents("");
        setDaySummary({ title: "", events: [] });
      }
    },
    [confirmUpload]
  );

  const onThemeSubmit = useCallback(
    (e) => {
      e.preventDefault();
      nextId.current += 1;
      setDaySummary({
        ...daySummary,
        events: [
          ...daySummary.events,
          {
            id: nextId.current,
            title: theme,
            contents: contents,
            thumb: dailythumb,
          },
        ],
      });
      dailyThumbInput.current.value = null;
      setDailyThumb("");
    },
    [planList, dayTitle, nextId, theme, contents]
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
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          setDailyThumb(reader.result);
        };
        reader.onerror = function(error) {
          console.log("Error", error);
        };

        dailyThumbInput.current.value = "";

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
    });
  };

  const clickDailyTheme = (theme) => {
    console.log(theme.id);
    if (editMode) {
      if (editMode != theme.id) {
        setTheme(theme.title);
        setContents(theme.contents);
        setDailyThumb(theme.thumb);
        setEditMode(theme.id);
        return;
      }
      setTheme("");
      setContents("");
      setDailyThumb("");
      setEditMode(false);
    } else {
      setTheme(theme.title);
      setContents(theme.contents);
      setDailyThumb(theme.thumb);
      setEditMode(theme.id);
    }
  };

  useEffect(() => {
    updateUploadedJson();
  }, []);
  if (!daySummary) {
    return <div>버그...로딩중</div>;
  }
  return (
    <Row>
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
                if (selectedPlan == day.id) {
                  setSelectedPlan(-1);
                  setDaySummary({ title: "", events: [] });
                  setEditMode(0);
                  dailyThumbInput.current.value = "";
                  setDailyThumb("");
                  setTheme("");
                  setContents("");
                } else {
                  setSelectedPlan(day.id);
                  setDaySummary(day);
                  setEditMode(0);
                  dailyThumbInput.current.value = "";
                  setDailyThumb("");
                  setTheme("");
                  setContents("");
                }
                console.log(day);
              }}
              style={{
                width: 100,
                height: 100,
                margin: 10,
                padding: ".5rem",
                background: day.id == selectedPlan ? "#FFB350" : "#089BAB",
                borderRadius: 15,
                cursor: "pointer",
              }}
            >
              <p>{day.title}</p>
              <div>주제 갯수 : {day.events.length}</div>
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
                background: editMode == day.id ? "#FFB350" : "#adc3fe",
                borderRadius: "15px",
              }}
              onClick={() => clickDailyTheme(day)}
            >
              {day.title}
            </div>
          ))}
        </div>

        <Form onSubmit={onThemeSubmit}>
          <div className="d-flex justify-content-around">
            {dailythumb ? (
              <Image
                src={dailythumb}
                rounded
                style={{ width: "160px", height: "90px" }}
              />
            ) : (
              <div
                style={{
                  width: "160px",
                  height: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#e2e2e2",
                }}
              >
                미리보기
              </div>
            )}
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
              value={theme}
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
              value={contents}
              placeholder="내용을 입력해주세요"
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {editMode || selectedPlan >= 0 ? (
              <Button
                variant="primary"
                type="button"
                style={{ marginRight: 30 }}
                onClick={() => {
                  if (selectedPlan >= 0) {
                    if (editMode) {
                      //daySummary 수정
                      setDaySummary((prev) => {});
                      // daySummary에서 수정하려 하는 이벤트 삭제
                      const events = daySummary.events.filter(
                        (theme) => editMode !== theme.id
                      );
                      const newEvent = {
                        id: editMode,
                        title: theme,
                        contents,
                        thumb: dailythumb,
                      };
                      events.push(newEvent);
                      const newDaySummary = {
                        ...daySummary,
                        events,
                      };

                      // planList 수정
                      console.log(
                        selectedPlan,
                        planList.filter((plans) => plans.id !== selectedPlan)
                      );

                      console.log("daySUmmary", daySummary);
                      setPlanList((prev) => {
                        const planList = prev.filter(
                          (plans) => plans.id !== selectedPlan
                        );
                        // const newPlan = daySummary;
                        planList.push(newDaySummary);
                        console.log(planList);

                        updateDailyPlan(planList, planId);
                        return planList;
                      });

                      console.log(
                        "플랜 날짜에 루틴을 수정하여 업데이트합니다."
                      );
                      console.log(planList);
                    } else {
                      //수정할 플랜만비워두기
                      setPlanList((prev) => {
                        let planList = prev.filter(
                          (plans) => plans.id !== selectedPlan
                        );
                        nextId.current = daySummary.events.length + 1;
                        //daySummary 이벤트에 추가
                        const newPlan = {
                          id: nextId.current,
                          title: theme,
                          contents,
                          thumb: dailythumb,
                        };
                        const events = daySummary.events.push(newPlan);
                        const nextDaySummary = {
                          ...daySummary,
                          events,
                        };
                        console.log(daySummary);
                        planList.push(daySummary);
                        console.log(planList);
                        updateDailyPlan(planList, planId);
                        return planList;
                      });
                      console.log(
                        "플랜 날짜에 루틴을 추가하여 업데이트합니다."
                      );
                    }
                  }

                  console.log(daySummary);
                }}
              >
                수정하기
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginRight: 30 }}
                >
                  소주제 추가
                </Button>
                <Button variant="primary" type="button" onClick={uploadDaily}>
                  날짜 업로드
                </Button>
              </>
            )}
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default React.memo(DailyUpload);
