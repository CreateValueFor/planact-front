import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Close from "../assets/img/close-01.svg";

export const StyledButton = styled(Button)`
  /* background: #313340; */
  /* border-radius: 12px; */
  border: none;
  background: #ffb350;
  border-radius: 30px;
  &:hover {
    filter: brightness(0.4);
    background: #ffb350;
  }
  &:active {
    filter: brightness(1);
    background: #ffb350;
    box-shadow: none;
  }
  &:focus {
    color: #fff;
    background-color: #ffb350;

    box-shadow: none;
  }
  &:active:focus {
    box-shadow: none;
    filter: brightness(1);
  }
`;

const StyledCloseButton = styled.div`
  font-size: 2rem;

  cursor: pointer;
`;

const StyledCustomTabButton = styled(Link)`
  cursor: pointer;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  /* identical to box height, or 185% */

  display: flex;
  align-items: center;

  /* PIVO GREY/PIVO GREY */

  color: #313340;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 7px;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 15px;
  &.active {
    background: #ffffff !important;
  }
  &:hover {
    background: #ffffff;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    color: #313340;
  }
`;

function CustomButton({ text, onClick, className, type, style }) {
  return (
    <StyledButton
      className={`w-100 ${className}`}
      onClick={onClick}
      type={type}
      style={style}
    >
      {text}
    </StyledButton>
  );
}

export const CustomeCloseButton = ({ onClick, style }) => {
  return (
    <StyledCloseButton style={style} onClick={onClick}>
      <img src={Close} className="custom-close-btn" alt="close"/>
    </StyledCloseButton>
  );
};

export const CustomTabButton = (props) => {
  const { focus, text, style, onClick, children, id, to, selectedId } = props;

  const computedClassName = selectedId === id ? "active" : "muted";
  return (
    <StyledCustomTabButton
      id={id}
      className={computedClassName}
      onClick={onClick}
      style={{ style }}
      to={to}
    >
      {children}
    </StyledCustomTabButton>
  );
};

export default CustomButton;
