import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
`;

function CustomContainer({ children, style }) {
  return <StyledContainer style={style}>{children}</StyledContainer>;
}

export default CustomContainer;
