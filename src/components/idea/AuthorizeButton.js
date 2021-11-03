import React from "react";
import styled from "styled-components";

const StyledTabItem = styled.div`
  z-index: 2;
  width: 85px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 46.5px;
  cursor: pointer;
  color: #fff;
  transition: 0.5s;
  background: transparent;
`;

const StyledAuthButton = styled(StyledTabItem)`
  width: 85px;
  height: 42px;
  transition: 0s;
`;

function AuthorizeButton({ clickAuth, openLogin, openRegister }) {
  const focusStyle = {
    background: "#FFFFFF",
    color: "#089BAB",
  };
  console.log(openRegister);
  return (
    <div className="d-flex flex-column">
      <StyledAuthButton onClick={clickAuth} style={openLogin ? focusStyle : {}}>
        로그인
      </StyledAuthButton>
      <StyledAuthButton
        onClick={clickAuth}
        style={openRegister ? focusStyle : {}}
      >
        회원가입
      </StyledAuthButton>
    </div>
  );
}

export default React.memo(AuthorizeButton);
