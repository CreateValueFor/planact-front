import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  /* background: #313340; */
  /* border-radius: 12px; */
  border: none;
  background: #ffb350;
  border-radius: 30px;
  &:hover {
    filter: brightness(0.4);
    background: #313340;
  }
  &:active {
    filter: brightness(1);
    background: #313340;
    box-shadow: none;
  }
  &:focus {
    color: #fff;
    background-color: #313340;

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
      &times;
    </StyledCloseButton>
  );
};

export default CustomButton;
