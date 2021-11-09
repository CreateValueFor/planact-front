import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import sample from "../../assets/img/sample.jpg";
import { usePlans } from "../../modules/Plans/hook";
import useAuth from "../../modules/User/hook";
import imageBase64 from "../../modules/customHooks/BufferToBase64";
import { Link } from "react-router-dom";

function SummaryUpload({ location, history }) {
  //plan summary inputs
  const [title, setTitle] = useState("");
  const [sns, setSns] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [thumb, setThumb] = useState();
  const [thumbPreview, setThumbPreview] = useState("");
  const imgRef = useRef();
  const resetInputField = () => {
    setTitle("");
    setSns("");
    setAuthor("");
    setCategory("");
    setThumb();
    setThumbPreview("");
    imgRef.current.value = "";
  };

  const {
    getUplaodedPlansByID,
    uploadSummaryPlans,
    getUploadedPlans,
    updateSummaryPlans,
  } = usePlans();
  const { email } = useAuth();

  const openDetailPlan = () => {
    const id = location.search.split("=")[1];
    history.push(`/uploads/daily?id=${id}`);
  };

  const updateSummaryPlan = () => {
    const summaryPlans = new FormData();
    const id = location.search.split("=")[1];
    summaryPlans.append("title", title);
    summaryPlans.append("sns", sns);
    summaryPlans.append("author", author);
    summaryPlans.append("category", category);
    summaryPlans.append("thumb", thumb);
    summaryPlans.append("email", email);
    updateSummaryPlans(summaryPlans, id).then(() => {
      getUploadedPlans();
    });
  };

  const onSummarySubmit = (e) => {
    e.preventDefault();
    const summaryPlans = new FormData();
    summaryPlans.append("title", title);
    summaryPlans.append("sns", sns);
    summaryPlans.append("author", author);
    summaryPlans.append("category", category);
    summaryPlans.append("thumb", thumb);
    summaryPlans.append("email", email);

    uploadSummaryPlans(summaryPlans).then(() => {
      getUploadedPlans();
    });
    e.target.reset();
    resetInputField();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    //input control function
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "sns":
        setSns(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "thumb":
        const file = e.target.files[0];
        setThumb(file);
        setThumbPreview(URL.createObjectURL(file));
        break;
    }
  };

  useEffect(
    () => {
      if (location.search) {
        const id = location.search.split("=")[1];
        getUplaodedPlansByID(id).then((res) => {
          console.log(res);
          const { title, author, category, sns } = res.plans;

          if (res.img) {
            setThumbPreview(imageBase64(res));
          } else {
            setThumbPreview("");
          }
          setTitle(title);
          setSns(sns);
          setAuthor(author);
          setCategory(category);
          imgRef.current.value = "";
          setThumb();
        });
      }
    },
    [location]
  );

  return (
    <Row className="mt-3">
      <Col lg="6">
        <h3>썸네일 업로드</h3>
        <div />
        <Image
          src={thumbPreview || sample}
          rounded
          style={{ width: "160px", height: "90px" }}
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>썸네일 업로드</Form.Label>
          <Form.Control
            ref={imgRef}
            type="file"
            name="thumb"
            onChange={handleInput}
          />
        </Form.Group>
      </Col>
      <Col lg="6">
        <h3>플랜 요약 업로드</h3>
        <Form onSubmit={onSummarySubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder="제목을 입력해주세요"
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Select
            onChange={handleInput}
            name="sns"
            aria-label="Default select example"
            value={sns}
          >
            <option>SNS 출처를 선택해주세요</option>
            <option value="instagram">인스타그램</option>
            <option value="naver">네이버 블로그</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>게시자</Form.Label>
            <Form.Control
              onChange={handleInput}
              name="author"
              value={author}
              type="text"
              placeholder="게시자"
            />
          </Form.Group>
          <Form.Select
            onChange={handleInput}
            name="category"
            aria-label="Default select example"
            value={category}
          >
            <option>카테고리를 선택해주세요</option>
            <option value="health">운동 루틴</option>
            <option value="diet">식단</option>
          </Form.Select>

          {location.search ? (
            <>
              <Button variant="primary" type="button" onClick={openDetailPlan}>
                세부 추가
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={updateSummaryPlan}
              >
                수정하기
              </Button>
              <Link to="/uploads" onClick={resetInputField}>
                플랜 새로 등록하러 가기
              </Link>
            </>
          ) : (
            <Button variant="primary" type="submit">
              플랜 등록
            </Button>
          )}
        </Form>
      </Col>
    </Row>
  );
}

export default React.memo(SummaryUpload);
