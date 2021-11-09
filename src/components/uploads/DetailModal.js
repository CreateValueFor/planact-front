import React, { useCallback, useEffect, useRef, useState } from "react";

function imageBase64(base64) {
  const imageString = `data:image; base64,${base64.img}`;
  return imageString;
}

function DetailModal({ modalContents, show, setShow }) {
  const { getDailyPlanImg, deleteDailyPlan, updateDailyPlan } = usePlans();
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

  const handleInputs = (e) => {
    const { name, value } = e.target;
    switch (name) {
      default:
        return;
    }
  };

  const updateDailyJson = () => {};

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateDailyJson}>
            {events.map((data, index) => (
              <div key={index}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <div>{data.id}</div>
                  <Form.Label>소주제</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="제목"
                    name={`title-${data.id}`}
                    value={data.title}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="내용"
                    name={`contents-${data.id}`}
                    value={data.contents}
                  />
                </Form.Group>
                <div className="d-flex">
                  {imageBuffers.map((base64, idx) => {
                    if (base64.name == data.thumb) {
                      return (
                        <img
                          style={{ width: 160, height: 90, marginRight: 16 }}
                          key={idx}
                          src={imageBase64(base64)}
                          alt=""
                        />
                      );
                    } else {
                      return (
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: 160,
                            height: 90,
                            background: "#e2e2e2",
                            marginRight: 16,
                          }}
                        >
                          미리보기
                        </div>
                      );
                    }
                  })}
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>사진</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </div>
              </div>
            ))}
            <Button type="submit">수정하기</Button>
          </Form>
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
export default React.memo(DetailModal);
