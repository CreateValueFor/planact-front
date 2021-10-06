import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background: #313340;
  border-radius: 12px;
  border: none;
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

function CustomButton({ text, onClick, className, type }) {
  return (
    <StyledButton
      className={`w-100 ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </StyledButton>
  );
}

export default CustomButton;
