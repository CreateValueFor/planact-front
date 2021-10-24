import React from "react";
import styled from "styled-components";

const StyledFilter = styled.div`
  height: 162px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c4c4c4;
  border-radius: 30px;
  margin-bottom: 44px;
`;

function Filter() {
  return <StyledFilter>필터 위치</StyledFilter>;
}

export default Filter;
