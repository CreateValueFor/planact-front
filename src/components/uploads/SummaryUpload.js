import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import sample from "../../assets/img/sample.jpg";
import { usePlans } from "../../modules/Plans/hook";
import queryString from "querystring";
import useAuth from "../../modules/User/hook";

function SummaryUpload({ location, history }) {
  //plan summary inputs
  const [title, setTitle] = useState("");
  const [sns, setSns] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [thumb, setThumb] = useState();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const {
    getUplaodedPlansByID,
    uploadSummaryPlans,
    getUploadedPlans,
  } = usePlans();
  const { email } = useAuth();

  const openDetailPlan = () => {
    const id = location.search.split("=")[1];
    history.push(`/uploads/daily?id=${id}`);
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
        setThumb(e.target.files[0]);
        break;
    }
    if (name === "thumb") {
      console.log(e.target.files[0]);
    }
  };

  useEffect(
    () => {
      if (location.search) {
        const id = location.search.split("=")[1];
        getUplaodedPlansByID(id).then((res) => {
          console.log(res);
          const { title, author, category, sns } = res;
          setTitle(title);
          setSns(sns);
          setAuthor(author);
          setCategory(category);
        });
      }
    },
    [location]
  );

  return (
    <Row className="mt-3">
      <Col lg="6">
        <h3>썸네일 업로드</h3>
        <Image
          src={sample}
          rounded
          style={{ width: "160px", height: "90px" }}
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>썸네일 업로드</Form.Label>
          <Form.Control type="file" name="thumb" onChange={handleInput} />
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
          <Button variant="primary" type="submit">
            플랜 등록
          </Button>
          {location.search && (
            <Button variant="primary" type="button" onClick={openDetailPlan}>
              세부 추가
            </Button>
          )}
        </Form>
      </Col>
    </Row>
  );
}

export default React.memo(SummaryUpload);
