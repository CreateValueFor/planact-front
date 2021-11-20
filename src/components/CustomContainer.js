import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flex};
`;

function CustomContainer({ id, children, style, flex }) {
  return (
    <StyledContainer id={id} className="flex-box" flex={flex} style={style}>
      {children}
    </StyledContainer>
  );
}

export default CustomContainer;
