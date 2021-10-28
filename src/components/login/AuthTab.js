import React from "react";
import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Profile from "../../assets/img/Default Profile.png";
const StyledListGroup = styled(ListGroup)`
  padding: 0;

  margin-bottom: 1.5rem;

  h2 {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1.5rem;
    color: #acadb2;
  }
  .list-group-item {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.5rem;
    /* identical to box height, or 185% */
    border: none;
    padding: 0;
    margin: 4px 0px !important;
    display: flex;
    align-items: center;

    /* PIVO GREY/PIVO GREY */

    color: #313340;

    /* Inside Auto Layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 7px;
  }
`;

const StyledProfileBox = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
  align-items: center;
  div {
    margin-left: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-family: Noto Sans KR;
      font-style: normal;
      font-weight: 500;
      font-size: 0.8125rem;
      line-height: 1.5rem;
      /* identical to box height, or 185% */

      display: flex;
      align-items: center;

      color: #000000;
    }
    h3 {
      font-family: Noto Sans KR;
      font-style: normal;
      font-weight: normal;
      font-size: 11px;
      margin-bottom: 0px;
      line-height: 1.5rem;
      /* identical to box height, or 240% */

      display: flex;
      align-items: center;

      color: #919191;
    }
  }
`;

function AuthTab({ open, style }) {
  if (!open) {
    return <></>;
  }
  return (
    <Card style={{ ...style, width: "250px" }}>
      <Card.Body>
        <StyledProfileBox>
          <img src={Profile} style={{ width: 42, height: 42 }} />
          <div>
            <h2>닉네임</h2>
            <h3>example@example.com</h3>
          </div>
        </StyledProfileBox>
        <StyledListGroup>
          <h2>내 계정</h2>
          <ListGroup clasName="flush" variant="flush">
            <ListGroup.Item action>계정 설정</ListGroup.Item>
            <ListGroup.Item action>로그아웃</ListGroup.Item>
          </ListGroup>
        </StyledListGroup>
        <StyledListGroup>
          <h2>PLANACT</h2>
          <ListGroup clasName="flush" variant="flush">
            <ListGroup.Item action>
              <Link to="/idea/inquiry">문의</Link>
            </ListGroup.Item>
            <ListGroup.Item action>개인정보처리방침</ListGroup.Item>
            <ListGroup.Item action>이용약관</ListGroup.Item>
          </ListGroup>
        </StyledListGroup>
      </Card.Body>
    </Card>
  );
}

export default AuthTab;
