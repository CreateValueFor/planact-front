import React, { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import sample from "../../assets/img/sample.jpg";

function SummaryUpload() {
  //plan summary inputs
  const [title, setTitle] = useState("");
  const [sns, setSns] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [thumb, setThumb] = useState();
  const onSummarySubmit = (e) => {
    e.preventDefault();
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
              placeholder="제목을 입력해주세요"
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Select
            onChange={handleInput}
            name="sns"
            aria-label="Default select example"
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
              type="text"
              placeholder="게시자"
            />
          </Form.Group>
          <Form.Select
            onChange={handleInput}
            name="category"
            aria-label="Default select example"
          >
            <option>카테고리를 선택해주세요</option>
            <option value="health">운동 루틴</option>
            <option value="diet">식단</option>
          </Form.Select>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default React.memo(SummaryUpload);
