import React, { useCallback, useEffect, useRef } from "react";
import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Profile from "../../assets/img/Default Profile.png";
import useAuth from "../../modules/User/hook";
export const StyledListGroup = styled(ListGroup)`
  padding: 0;

  margin-bottom: 1.5rem;

  h2 {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1.5rem;
    color: #acadb2;
  }
  .list-group-item {
    font-family: "Noto Sans KR";
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
    a {
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: #313340;
    }
  }
`;

export const StyledProfileBox = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
  align-items: center;
  div {
    margin-left: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-family: "Noto Sans KR";
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
      font-family: "Noto Sans KR";
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

function AuthTab({ open, style, setAuthTab }) {
  const { logout,email, nick } = useAuth();
  const el = useRef();
  const onClick = useCallback(() => {
    logout();
  }, []);

  useEffect(() => {
    window.addEventListener("click", () => {
      setAuthTab(false);
    });
    return () => {
      window.removeEventListener("click", () => {
        setAuthTab(false);
      });
    };
  }, []);
  if (!open) {
    return <></>;
  }
  return (
    <Card
      style={{ ...style, width: "250px" }}
      onClick={(e) => e.stopPropagation()}
    >
      <Card.Body>
        <StyledProfileBox>
          <img src={Profile} style={{ width: 42, height: 42 }} />
          <div>
            <h2 style={{marginBottom:"-.2rem"}}>{nick}</h2>
            <h3>{email}</h3>
          </div>
        </StyledProfileBox>
        <StyledListGroup>
          <h2>내 계정</h2>
          <ListGroup variant="flush">
            <ListGroup.Item action>
              <Link to="/inquiry/profile">계정 설정</Link>
            </ListGroup.Item>
            <ListGroup.Item action onClick={onClick}>
              로그아웃
            </ListGroup.Item>
          </ListGroup>
        </StyledListGroup>
        <StyledListGroup>
          <h2>PLANACT</h2>
          <ListGroup variant="flush">
            <ListGroup.Item action>
              <Link to="/inquiry/usage">문의</Link>
            </ListGroup.Item>
            <ListGroup.Item action>
              <Link to="/inquiry/collect">개인정보처리방침</Link>
            </ListGroup.Item>
            <ListGroup.Item action>
              <Link to="/inquiry/usage">이용약관</Link>
            </ListGroup.Item>
          </ListGroup>
        </StyledListGroup>
      </Card.Body>
    </Card>
  );
}

export default AuthTab;
