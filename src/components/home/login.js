import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "./login.scss";
import RegisterModal from "../login/Register";
function Login({ setLogin, setRegister }) {
  const [show, setShow] = useState(false);

  const handleModal = useCallback(
    () => {
      setRegister((prev) => !prev);
    },
    [setShow]
  );
  const onClick = useCallback(() => {
    setLogin((prev) => !prev);
  }, []);
  return (
    <Card>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted login-detail mb-3">
          로그인을 통해 나의 일정을 저장하세요!
        </Card.Subtitle>
        <Button
          variant="dark"
          size="lg"
          className="w-100 login-btn mb-3"
          onClick={onClick}
        >
          로그인
        </Button>
        <div className="d-flex justify-content-between">
          <Button
            variant="white"
            onClick={handleModal}
            className="d-flex justify-content-center w-100"
          >
            <div className="text-muted register mr-2">계정이 없으신가요?</div>
            <div className="register ml-2">회원가입</div>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Login;
