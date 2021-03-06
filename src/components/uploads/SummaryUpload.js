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
        <h3>????????? ?????????</h3>
        <div />
        <Image
          src={thumbPreview || sample}
          rounded
          style={{ width: "160px", height: "90px" }}
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>????????? ?????????</Form.Label>
          <Form.Control
            ref={imgRef}
            type="file"
            name="thumb"
            onChange={handleInput}
          />
        </Form.Group>
      </Col>
      <Col lg="6">
        <h3>?????? ?????? ?????????</h3>
        <Form onSubmit={onSummarySubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>??????</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder="????????? ??????????????????"
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Select
            onChange={handleInput}
            name="sns"
            aria-label="Default select example"
            value={sns}
          >
            <option>SNS ????????? ??????????????????</option>
            <option value="instagram">???????????????</option>
            <option value="naver">????????? ?????????</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>?????????</Form.Label>
            <Form.Control
              onChange={handleInput}
              name="author"
              value={author}
              type="text"
              placeholder="?????????"
            />
          </Form.Group>
          <Form.Select
            onChange={handleInput}
            name="category"
            aria-label="Default select example"
            value={category}
          >
            <option>??????????????? ??????????????????</option>
            <option value="health">?????? ??????</option>
            <option value="diet">??????</option>
          </Form.Select>

          {location.search ? (
            <>
              <Button variant="primary" type="button" onClick={openDetailPlan}>
                ?????? ??????
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={updateSummaryPlan}
              >
                ????????????
              </Button>
              <Link to="/uploads" onClick={resetInputField}>
                ?????? ?????? ???????????? ??????
              </Link>
            </>
          ) : (
            <Button variant="primary" type="submit">
              ?????? ??????
            </Button>
          )}
        </Form>
      </Col>
    </Row>
  );
}

export default React.memo(SummaryUpload);
