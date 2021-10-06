import React, { useCallback, useRef, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import InputForm from "../InputForm";
import CustomButton from "../CustomButton";
function RegisterModal({ setRegister }) {
  const { register, login } = useAuth();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("collect"));
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
    const nick = "test";
    const password = data.get("password");
    register({ email, nick, password });
    setRegister(false);
  }, []);

  return (
    <Card
      style={{
        left: "100%",
        position: "absolute",
        top: 0,
        width: 330,
        zIndex: 10,
        marginLeft: ".75rem",
      }}
    >
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <InputForm placeholder="닉네임" type="text" />
          <InputForm placeholder="이메일" type="email" />
          <InputForm
            placeholder="비밀번호"
            text="영문자+숫자 조합 6~12자리"
            type="password"
          />
          <Form.Check
            type={"checkbox"}
            label={`플랜액트 이용약관 동의(필수)`}
            id="usage-agreement"
            className="mb-1"
            name="usage"
          />
          <Form.Check
            type={"checkbox"}
            label={`플랜액트 개인정보 수집 동의(필수)`}
            id="privacy-agreement"
            className="mb-3"
            name="collect"
          />
          <CustomButton text="회원가입" className="mb-3" type="submit" />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RegisterModal;
