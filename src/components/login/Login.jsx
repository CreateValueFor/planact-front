import React, { useCallback } from "react";
import { Button, Card, Form } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import CustomButton from "../CustomButton";
import InputForm from "../InputForm";

function LoginModal({ setLogin, setIsLogin }) {
  const { register, login } = useAuth();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("email"));
    const email = data.get("email");
    const nick = "test";
    const password = data.get("password");
    login({ email, password });
    setIsLogin(true);
  }, []);

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <InputForm placeholder="이메일" type="email" />
          <InputForm placeholder="비밀번호" type="password" />
          <CustomButton text="로그인" />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoginModal;
