import React, { useCallback } from "react";
import { Button, Card, Form } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import CustomButton from "../CustomButton";
import InputForm from "../InputForm";
import Logo from "../../assets/img/Subtract.png";
import { CustomeCloseButton } from "../CustomButton";
import eventFunction from "../../modules/customHooks/eventFunction";

function LoginModal({ setLogin, style, open }) {
  const { login } = useAuth();
  const { stopPropagation } = eventFunction();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("email"));
    const email = data.get("email");
    const nick = "test";
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
          style={{ marginBottom: 22, marginTop: 4 }}
        >
          <div style={{ width: 20 }} />
          <img src={Logo} />
          <CustomeCloseButton
            style={{
              fontSize: "2rem",
              // transform: "matrix(-1, 0, 0, 1, 0, 0)",
            }}
            onClick={() => {
              setLogin(false);
            }}
          />
        </div>
        <Form onSubmit={onSubmit}>
          <InputForm placeholder="이메일" type="email" />
          <InputForm placeholder="비밀번호" type="password" className="mb-5" />
          <CustomButton
            text="로그인"
            type="submit"
            style={{ marginBottom: 28 }}
          />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoginModal;
