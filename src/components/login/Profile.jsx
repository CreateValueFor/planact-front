import React, { useCallback } from "react";
import { Card } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import DefaultPorfile from "../../assets/img/Default Profile.png";
import CustomButton from "../CustomButton";

function Profile({ setIsLogin }) {
  const { nick, logout } = useAuth();
  console.log(nick);
  const onClick = useCallback(() => {
    logout();
  }, []);
  return (
    <Card>
      <Card.Body>
        <img src={DefaultPorfile} />
        <Card.Title>{nick} 님 안녕하세요.</Card.Title>
        <CustomButton text="로그아웃" onClick={onClick} type="button" />
      </Card.Body>
    </Card>
  );
}

export default Profile;
