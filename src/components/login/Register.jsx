import React, { useCallback, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import InputForm from "../InputForm";
import CustomButton from "../CustomButton";
function RegisterModal({ setLogin, setIsLogin, show, handleModal }) {
  const { register, login } = useAuth();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("email"));
    const email = data.get("email");
    const nick = "test";
    const password = data.get("password");
    register({ email, nick, password });
    setIsLogin(true);
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton />
        <Card>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <InputForm placeholder="닉네임" type="text" />
              <InputForm placeholder="이메일" type="email" />
              <InputForm
                placeholder="비밀번호"
                text="영문자+숫자 조합 6~12자리"
                type="password"
              />
              <CustomButton text="회원가입" />
            </Form>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
}

export default RegisterModal;
