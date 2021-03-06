import React, { useCallback, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import CustomButton from "../CustomButton";
import InputForm from "../InputForm";
import Logo from "../../assets/img/Subtract.svg";
import { CustomeCloseButton } from "../CustomButton";
import eventFunction from "../../modules/customHooks/eventFunction";
import useViews from "../../modules/View/hooks";
import styled from "styled-components";
import { useHistory } from "react-router";
import Close from "../../assets/img/close-01.svg";
const StyledCard = styled(Card)`
  height: ${(props) => props.height}px;
  min-height: ${(props) => props.height}px;
  margin-top: -3rem;

  .card-body {
    display: flex;
    flex-direction: column;
    form {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .register-btn {
      font-family: Noto Sans KR;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 12px;
      /* identical to box height, or 92% */

      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex: 1;
      color: #737373;
      div {
        color: #74b9ff;
        margin-left: 1rem;
      }
    }
  }
`;

const StyledInputForm = styled(InputForm)`
  input {
    height: 60px;
    padding:30px 20px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;

    color: #83848c;
  }
`;
function LoginPage() {
  const { login } = useAuth();
  const { changeView } = useViews();
  const { stopPropagation } = eventFunction();
  const [email, setEmail] = useState();
  const [passsword, setPassword] = useState();
  const history = useHistory();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const email = data.get("email");

    const password = data.get("password");
    login({ email, password }).then(() => {
      window.alert("??????????????? ????????????????????????.");
      history.push("/");
    });
  }, []);
  const height = window.innerHeight;
  console.log("hhh");
  useEffect(() => {
    changeView("login");
  }, []);
  return (
    <StyledCard height={height} onClick={stopPropagation}>
      <Card.Body>
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: 22, marginTop: 4, alignItems: "center" }}
        >
          <div style={{ width: 20 }} />
          <img
            src={Logo}
            style={{ width: "33px", height: "50px" }}
            alt="logo"
          />
          <CustomeCloseButton
            style={{
              fontSize: "1.5rem",
              // transform: "matrix(-1, 0, 0, 1, 0, 0)",
            }}
            onClick={() => {
              history.push("/");
            }}
          />
        </div>
        <Form onSubmit={onSubmit}>
          <StyledInputForm
            style={{ marginTop: "80px" }}
            placeholder="?????????"
            type="email"
            setValue={setEmail}
          />
          <StyledInputForm
            placeholder="????????????"
            type="password"
            className="mb-5"
            setValue={setPassword}
            style={{ height: "60px", marginBottom: "0rem" }}
          />
          <div className="register-btn">
            ????????? ????????????????
            <div
              onClick={() => {
                history.push("/register");
              }}
              style={{color:"#089BAB"}}
            >
              ????????????
            </div>
          </div>
          <CustomButton
            text="?????????"
            type="submit"
            style={{ marginBottom: 28, height: "60px" }}
          />
        </Form>
      </Card.Body>
    </StyledCard>
  );
}

export default LoginPage;
