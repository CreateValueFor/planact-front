import React, { useCallback, useState } from "react";
import { Card, Form } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import InputForm from "../InputForm";
import Logo from "../../assets/img/Subtract.png";
import CustomButton, { CustomeCloseButton } from "../CustomButton";
import "./login.scss";
import eventFunction from "../../modules/customHooks/eventFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactHtmlParser from "react-html-parser";
import collect from "../../assets/docs/collect";
import usage from "../../assets/docs/usage";
const DetailAgreement = ({ children, clickDetail, type }) => {
  return (
    <Card style={{ width: "100%", height: "100%", position: "absolute" }}>
      <Card.Body className="d-flex flex-column">
        <div
          className="d-flex justify-content-start align-items-center mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            clickDetail("close");
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <div>플랜액트 {type}</div>
        </div>
        <div
          style={{
            maxHeight: "100%",
            width: "100%",
            flex: 1,
            background: "#F1F6F9",
            borderRadius: 30,
            overflowY: "scroll",
            padding: "14px",
          }}
        >
          {children}
        </div>
      </Card.Body>
    </Card>
  );
};

function RegisterModal({ setRegister, style, open }) {
  const { register } = useAuth();
  const { stopPropagation } = eventFunction();

  const [openUsage, setOpenUsage] = useState(false);
  const [openCollect, setOpenCollect] = useState(false);
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    console.log(data);
    console.log(data.get("nick"));
    if (data.get("nick") == "") {
      window.alert("닉네임을 입력해주세요.");
      return;
    }
    if (!data.get("email")) {
      window.alert("이메일을 입력해주세요.");
      return;
    }
    if (!data.get("password")) {
      window.alert("비밀번호를 입력해주세요.");
      return;
    }
    if (data.get("usage") !== "on") {
      window.alert("이용약관에 동의해주세요.");
      return;
    }
    if (data.get("collect") !== "on") {
      window.alert("개인정보 수집에 동의해주세요.");
      return;
    }
    const email = data.get("email");
    const nick = data.get("nick");
    const password = data.get("password");
    register({ email, nick, password });
    setRegister(false);
  }, []);

  const clickDetail = useCallback((string) => {
    switch (string) {
      case "usage":
        setOpenUsage(true);
        break;
      case "collect":
        setOpenCollect(true);
        break;
      case "close":
        setOpenCollect(false);
        setOpenUsage(false);
        break;
      default:
        console.log("something wrong");
        break;
    }
  }, []);

  if (!open) {
    return <></>;
  }
  return (
    <Card
      className="auth-modal"
      style={{ ...{ position: "relative" }, ...style }}
      onClick={stopPropagation}
    >
      {openUsage && (
        <DetailAgreement
          text={"asdfadf"}
          type="이용약관"
          clickDetail={clickDetail}
        >
          {ReactHtmlParser(usage)}
        </DetailAgreement>
      )}
      {openCollect && (
        <DetailAgreement
          text={"asdfadf"}
          type="개인정보수집동의"
          clickDetail={clickDetail}
        >
          {ReactHtmlParser(collect)}
        </DetailAgreement>
      )}
      <Card.Body>
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: 22, marginTop: 4 }}
        >
          <div style={{ width: 20 }} />
          <img src={Logo} />
          <CustomeCloseButton
            onClick={() => {
              setRegister(false);
            }}
          />
        </div>
        <Form onSubmit={onSubmit}>
          <InputForm placeholder="닉네임" type="nick" setValue={setNick} />
          <InputForm placeholder="이메일" type="email" setValue={setEmail} />
          <InputForm
            placeholder="비밀번호"
            text="영문자+숫자 조합 6~12자리"
            type="password"
            setValue={setPassword}
          />
          <div className="d-flex">
            <Form.Check
              type="checkbox"
              label={`플랜액트 이용약관 동의(필수)`}
              id="usage-agreement"
              name="usage"
              className="mb-1"
              style={{ flex: 1 }}
            />
            <div
              name="usage"
              onClick={() => {
                clickDetail("usage");
              }}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
          <div className="d-flex">
            <Form.Check
              type={"checkbox"}
              label={`플랜액트 개인정보 수집 동의(필수)`}
              id="privacy-agreement"
              name="collect"
              className="mb-3"
              style={{ flex: 1 }}
            />
            <div
              name="collect"
              style={{ cursor: "pointer" }}
              onClick={() => {
                clickDetail("collect");
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
          <CustomButton
            text="회원가입"
            type="submit"
            style={{ marginBottom: 28 }}
          />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RegisterModal;
