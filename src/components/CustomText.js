import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
  /* identical to box height, or 130% */

  letter-spacing: 1px;

  color: #909090;
`;

const StyledLink = styled.a`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  /* identical to box height, or 185% */

  display: flex;
  align-items: center;

  /* PIVO GREY/PIVO GREY */
  text-decoration: none;
  color: #313340;
`;

const StyledText = styled.h2`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 35px;
  /* identical to box height, or 173% */

  letter-spacing: 1px;

  color: #000000;
`;

export const CustomLabelText = ({ text, fontSize, style }) => {
  return <StyledLabel style={{ fontSize, ...style }}>{text}</StyledLabel>;
};

function CustomText({ text, fontSize, style }) {
  return <StyledText style={{ fontSize, ...style }}>{text}</StyledText>;
}

export function CustomLinkText({ text, fontSize, style, href }) {
  return (
    <StyledLink target="_blank" href={href} style={{ fontSize, ...style }}>
      {text}
    </StyledLink>
  );
}

export default CustomText;
