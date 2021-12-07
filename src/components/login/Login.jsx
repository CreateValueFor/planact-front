import React, { useCallback, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import CustomButton from "../CustomButton";
import InputForm from "../InputForm";
import Logo from "../../assets/img/Subtract.svg";
import { CustomeCloseButton } from "../CustomButton";
import eventFunction from "../../modules/customHooks/eventFunction";
import styled from "styled-components"

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
  }
  .custom-close-btn{
    width:12px;
    height:12px;
  }
  img{
    width:12px !important;
  }
`;

function LoginModal({ setLogin, style, open }) {
  const { login } = useAuth();
  const { stopPropagation } = eventFunction();
  const [email, setEmail] = useState();
  const [passsword, setPassword] = useState();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const email = data.get("email");

    const password = data.get("password");
    login({ email, password });
    setLogin(false);
  }, []);
  if (!open) {
    return <></>;
  }
  return (
    <Card style={style} onClick={stopPropagation}>
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
            style={{
              fontSize: "1.25rem",
              // transform: "matrix(-1, 0, 0, 1, 0, 0)",
            }}
            onClick={() => {
              setLogin(false);
            }}
          />
        </div>
        <StyledLoginForm onSubmit={onSubmit}>
          <InputForm placeholder="이메일" type="email" setValue={setEmail} />
          <InputForm
            placeholder="비밀번호"
            type="password"
            className="mb-5"
            setValue={setPassword}
          />
          <CustomButton
            text="로그인"
            type="submit"
            style={{fontSize:13, marginBottom: 28, height:43 }}
          />
        </StyledLoginForm>
      </Card.Body>
    </Card>
  );
}

export default LoginModal;
