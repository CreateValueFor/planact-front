import React, { useCallback, useState } from "react";
import { Card, Form } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import InputForm from "../InputForm";
import Logo from "../../assets/img/Subtract.svg";
import CustomButton, { CustomeCloseButton } from "../CustomButton";
import "./login.scss";
import eventFunction from "../../modules/customHooks/eventFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactHtmlParser from "react-html-parser";
import collect from "../../assets/docs/collect";
import usage from "../../assets/docs/usage";
import styled from "styled-components";
import CustomText, { CustomLabelText } from "../CustomText";
import RightChevron from "../../assets/img/RightChevron.svg";

const StyledHtmlContainer = styled.div`
  /* max-height: 100%; */
  width: 100%;
  /* flex: 1; */
  background: #f1f6f9;
  border-radius: 30px;
  /* overflow-y: scroll; */
  padding: 14px;
  flex-grow: 1;
  height: 330px;
  overflow: auto;
  /* for Firefox */
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
  * {
    background: #f1f6f9 !important;
  }
  html {
    height: 100%;
    background: #f1f6f9;
  }
`;

const DetailAgreement = ({ children, clickDetail, type }) => {
  return (
    <StyledCard style={{ width: "100%", height: "100%", position: "absolute" }}>
      <Card.Body className="d-flex flex-column">
        <div
          className="d-flex justify-content-center align-items-center mb-3"
          style={{ cursor: "pointer", position: "relative" }}
          onClick={() => {
            clickDetail("close");
          }}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{
              position: "absolute",
              top: "50%",
              left: "1rem",
              transform: "translate(0, -50%)",
            }}
          />
          <div>플랜액트 {type}</div>
        </div>
        <StyledHtmlContainer style={{}}>{children}</StyledHtmlContainer>
      </Card.Body>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25), 0px 0px 16px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
`;

const StyledLoginForm = styled(Form)`
  input{
    font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  /* or 142% */
      padding: 12px 20px;

  display: flex;
  align-items: center;
  color: #83848C;
  margin-bottom: 20px !important;
  }
  input[name="password"]{
    margin-bottom: 0px !important;
  }
  .custom-close-btn{
    width:12px;
    height:12px;
  }
  img{
    width:8px !important;
  }
  input[type="checkbox"]{
    padding:0;
    width:16px;
    height:16px;
    border-radius: 50%;
    margin-bottom:.5rem !important;
  }
`;

function RegisterModal({ setRegister, style, open }) {
  const { register } = useAuth();
  const { stopPropagation } = eventFunction();

  const [openUsage, setOpenUsage] = useState(false);
  const [openCollect, setOpenCollect] = useState(false);
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const data = new FormData(e.target);

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
    // setRegister(false);
    setRegisterSuccess(true);
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
    <StyledCard
      className="auth-modal"
      style={{ ...{ position: "relative" }, ...style }}
      onClick={stopPropagation}
    >
      {registerSuccess && (
        <StyledCard
          style={{ width: "100%", height: "100%", position: "absolute" }}
        >
          <Card.Body className="d-flex flex-column">
            <div
              className="d-flex justify-content-between"
              style={{ marginBottom: 22, marginTop: 4 }}
            >
              <img
                src={Logo}
                style={{ margin: "0 auto", width: "23px", height: "35px" }}
                alt="logo"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              <CustomLabelText
                fontSize={20}
                text="환영합니다."
                style={{
                  color: "#000000",
                  textAlign: "center",
                  marginBottom: "50px",
                  marginTop: "50px",
                }}
              />
              <p style={{ textAlign: "center" }}>
                {nick}님, 회원가입을 축하합니다. <br />
                이제 플랜액트에서 나의 일정을 저장하고
                <br />
                다운로드할 수 있습니다.
              </p>
            </div>
            <CustomButton
              text="시작하기"
              type="button"
              onClick={() => {
                setRegister(false);
              }}
              style={{ marginBottom: 28 }}
            />
          </Card.Body>
        </StyledCard>
      )}
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
          style={{ marginBottom: 22, marginTop: 4, alignItems: "center" }}
        >
          <div style={{ width: 20 }} />
          <img
            src={Logo}
            style={{ width: "23px", height: "35px" }}
            alt="logo"
          />
          <CustomeCloseButton
            onClick={() => {
              setRegister(false);
            }}
            style={{ fontSize: "1.25rem" }}
          />
        </div>
        <StyledLoginForm onSubmit={onSubmit}>
          <InputForm placeholder="닉네임" type="nick" setValue={setNick} />
          <InputForm placeholder="이메일" type="email" setValue={setEmail} />
          <InputForm
            placeholder="비밀번호"
            text="영문자+숫자 조합 6~12자리"
            type="password"
            setValue={setPassword}
          />
          <div className="d-flex" style={{alignItems:"baseline"}}>
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
              <img src={RightChevron} alt="rightChevron"/>
              
            </div>
          </div>
          <div className="d-flex" style={{alignItems:"baseline"}}>
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
              <img src={RightChevron} style={{width:6}} alt="rightChevron"/>
              
            </div>
          </div>
          <CustomButton
            text="회원가입"
            type="submit"
            style={{ fontSize:13, marginBottom: 28,height:"43px" }}
          />
        </StyledLoginForm>
      </Card.Body>
    </StyledCard>
  );
}

export default RegisterModal;
