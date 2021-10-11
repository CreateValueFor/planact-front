import React from "react";
import { Card } from "react-bootstrap";
import useAuth from "../../modules/User/hook";
import DefaultPorfile from "../../assets/img/Default Profile.png";
function Profile({ setIsLogin }) {
  const { nick } = useAuth();
  console.log(nick);
  return (
    <Card>
      <Card.Body>
        <img src={DefaultPorfile} />
        <Card.Title>{nick} 님 안녕하세요.</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Profile;
