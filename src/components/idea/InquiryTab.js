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
    a {
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: #313340;
    }
  }
`;

function InquiryTab() {
  const [selected, setSelected] = useState(1);
  const onTabClick = useCallback((e) => {
    console.log(e.target.id);
    setSelected(e.target.id);
  }, []);

  return (
    <StyledTabBox>
      <ListGroup variant={"flush"}>
        <CustomLabelText text={"내 계정"} />
        <CustomTabButton
          to="/idea/inquiry/profile"
          focus
          selectedId={selected}
          id="1"
          onClick={onTabClick}
        >
          계정설정
        </CustomTabButton>
        <CustomTabButton
          to="/"
          selectedId={selected}
          id="2"
          onClick={onTabClick}
        >
          로그아웃
        </CustomTabButton>
      </ListGroup>
      <ListGroup>
        <CustomLabelText text="PLANACT" />
        <CustomTabButton
          to="/idea/inquiry/ask"
          selectedId={selected}
          id="3"
          onClick={onTabClick}
        >
          문의
        </CustomTabButton>
        <CustomTabButton
          to="/idea/inquiry/collect"
          selectedId={selected}
          id="4"
          onClick={onTabClick}
        >
          개인정보처리방침
        </CustomTabButton>
        <CustomTabButton
          to="/idea/inquiry/usage"
          selectedId={selected}
          id="5"
          onClick={onTabClick}
        >
          이용약관
        </CustomTabButton>
      </ListGroup>
    </StyledTabBox>
  );
}

export default InquiryTab;
