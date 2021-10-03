import React from "react";
import { Card } from "react-bootstrap";
import useAuth from "../../modules/User/hook";

function Profile({ setIsLogin }) {
  const { nick } = useAuth();
  console.log(nick);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{nick} 님 안녕하세요.</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Profile;
