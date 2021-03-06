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
import { useHistory } from "react-router";
import RightChevron from "../../assets/img/Union.svg";

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
    <StyledCard
      style={{
        width: "100%",
        height: "100%",
        top: "2rem",
        position: "absolute",
      }}
    >
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
          <div>???????????? {type}</div>
        </div>
        <StyledHtmlContainer style={{}}>{children}</StyledHtmlContainer>
      </Card.Body>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  height: ${(props) => props.height}px;
  min-height: ${(props) => props.height}px;
  box-shadow: none;
  width: 100%;
  z-index: 100;
  margin-top: -3rem;
  .card-body {
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem;
  }
  /* margin-left: -0.75rem; */
`;

const StyledInputForm = styled(InputForm)`
  margin-bottom: 30px !important;
  border-width: 2px;
  input {
    height: 60px;
    padding:30px 20px;
  }
`;

const StyledFormCheck = styled(Form.Check)`
  margin-bottom: 20px;
  label {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5rem;

    color: #000000;

  }
  input[type="checkbox"]{
    border-radius: 50%;
  }
`;

function RegisterPage({}) {
  const { register } = useAuth();
  const { stopPropagation } = eventFunction();

  const [openUsage, setOpenUsage] = useState(false);
  const [openCollect, setOpenCollect] = useState(false);
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const history = useHistory();
  const height = window.innerHeight;

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    if (data.get("nick") == "") {
      window.alert("???????????? ??????????????????.");
      return;
    }
    if (!data.get("email")) {
      window.alert("???????????? ??????????????????.");
      return;
    }
    if (!data.get("password")) {
      window.alert("??????????????? ??????????????????.");
      return;
    }
    if (data.get("usage") !== "on") {
      window.alert("??????????????? ??????????????????.");
      return;
    }
    if (data.get("collect") !== "on") {
      window.alert("???????????? ????????? ??????????????????.");
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

  return (
    <StyledCard
      height={height}
      className="auth-modal"
      style={{ ...{ position: "relative",boxShadow:"none" } }}
      onClick={stopPropagation}
    >
      {registerSuccess && (
        <StyledCard
          style={{
            width: "100%",
            height: "100%",
            top: "2rem",
            position: "absolute",
          }}
        >
          <Card.Body className="d-flex flex-column">
            <div
              className="d-flex justify-content-between"
              style={{ marginBottom: 22, marginTop: 4 }}
            >
              <img
                src={Logo}
                style={{
                  margin: "0 auto",
                  width: "33px",
                  height: "50px",
                  marginTop: "26px",
                }}
                alt="logo"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <CustomLabelText
                fontSize={20}
                text="???????????????."
                style={{
                  fontSize: "26px",
                  color: "#000000",
                  textAlign: "center",
                  marginBottom: "60px",
                  marginTop: "50px",
                }}
              />
              <p style={{ textAlign: "center" }}>
                {nick}???, ??????????????? ???????????????. <br />
                ?????? ?????????????????? ?????? ????????? ????????????
                <br />
                ??????????????? ??? ????????????.
              </p>
            </div>
            <CustomButton
              text="????????????"
              type="button"
              onClick={() => {
                history.push("/login");
              }}
              style={{ marginBottom: 28, height: "60px" }}
            />
          </Card.Body>
        </StyledCard>
      )}
      {openUsage && (
        <DetailAgreement
          text={"asdfadf"}
          type="????????????"
          clickDetail={clickDetail}
        >
          {ReactHtmlParser(usage)}
        </DetailAgreement>
      )}
      {openCollect && (
        <DetailAgreement
          text={"asdfadf"}
          type="????????????????????????"
          clickDetail={clickDetail}
        >
          {ReactHtmlParser(collect)}
        </DetailAgreement>
      )}
      <Card.Body>
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: 40, marginTop: 4, alignItems: "center" }}
        >
          <div style={{ width: 20 }} />
          <img
            src={Logo}
            style={{ width: "33px", height: "50px", marginTop: "0px" }}
            alt="logo"
          />
          <CustomeCloseButton
            onClick={() => {
              history.push("/");
            }}
            style={{ width:22,fontSize: "1.5rem" }}
          />
        </div>
        <Form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <StyledInputForm
            placeholder="?????????"
            type="nick"
            setValue={setNick}
          />
          <StyledInputForm
            placeholder="?????????"
            type="email"
            setValue={setEmail}
          />
          <StyledInputForm
            placeholder="????????????"
            text="?????????+?????? ?????? 6~12??????"
            type="password"
            setValue={setPassword}
          />
          <div className="d-flex" style={{marginTop:"1rem"}}>
            <StyledFormCheck
              type="checkbox"
              label={`???????????? ???????????? ??????(??????)`}
              id="usage-agreement"
              name="usage"
              className=""
              style={{ flex: 1,marginBottom:"20px" }}
            />
            <div
              name="usage"
              onClick={() => {
                clickDetail("usage");
              }}
              style={{ cursor: "pointer" }}
            > 
              <img style={{width:8}} src={RightChevron} alt="rightChevron"/>
              
            </div>
          </div>
          <div className="d-flex">
            <StyledFormCheck
              type={"checkbox"}
              label={`???????????? ???????????? ?????? ??????(??????)`}
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
              <img style={{width:8}} src={RightChevron} alt="rightChevron"/>
              
            </div>
          </div>
          <div style={{ flex: 1 }}>&nbsp;</div>
          <CustomButton
            text="????????????"
            type="submit"
            style={{ marginBottom: 28, height: "60px" }}
          />
        </Form>
      </Card.Body>
    </StyledCard>
  );
}

export default RegisterPage;
