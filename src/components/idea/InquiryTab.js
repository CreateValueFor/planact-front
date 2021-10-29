import React, { useCallback, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CustomTabButton } from "../CustomButton";
import CustomText, { CustomLabelText } from "../CustomText";

const StyledTabBox = styled.div`
  padding-top: 168px;
  .list-group {
    padding: 0;
    margin: 0;
    margin-bottom: 2rem;
    label {
      padding: 0 12px;
      margin-bottom: 1rem;
      font-size: 0.75rem;
      color: #089bab;
    }
  }
  .list-group-item {
    margin: 0;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    /* identical to box height, or 185% */
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    align-items: center;

    /* PIVO GREY/PIVO GREY */
    background: transparent;
    color: #313340;
    border: none;
    border-radius: 15px;
    /* Inside Auto Layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    /* margin: 0px 7px; */

    &:hover {
      background: #ffffff;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
      border-radius: 15px;
    }
    &:active {
      background: #ffffff;
    }
  }
`;

function InquiryTab() {
  const [selected, setSelected] = useState(1);
  const onTabClick = useCallback((e) => {
    console.log(e);
  }, []);

  return (
    <StyledTabBox>
      <ListGroup variant={"flush"}>
        <CustomLabelText text={"내 계정"} />
        <CustomTabButton focus action id="1" onClick={onTabClick}>
          <Link to="/idea/inquiry/profile">계정설정</Link>
        </CustomTabButton>
        <CustomTabButton action id="2" text={"로그아웃"} onClick={onTabClick} />
      </ListGroup>
      <ListGroup>
        <CustomLabelText text="PLANACT" />
        <CustomTabButton action id="3" onClick={onTabClick}>
          <Link to="/idea/inquiry/ask">문의</Link>
        </CustomTabButton>
        <CustomTabButton action id="4" onClick={onTabClick}>
          <Link to="/idea/inquiry/collect">개인정보처리방침</Link>
        </CustomTabButton>
        <CustomTabButton action id="5" onClick={onTabClick}>
          <Link to="/idea/inquiry/usage">이용약관</Link>
        </CustomTabButton>
      </ListGroup>
    </StyledTabBox>
  );
}

export default InquiryTab;
