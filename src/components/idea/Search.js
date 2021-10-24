import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledSearchContainer = styled.div`
  height: 36px;
  width: 240px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 100px;
  display: flex;
  align-items: center;
  margin-left: 3rem;
  margin-bottom: 2.25rem;
  padding: 1rem;
  input {
    border: none;
    flex: 1;
    display: inline-block;
    outline: none;
    margin-left: 0.25rem;
  }
`;

function Search() {
  return (
    <StyledSearchContainer className="mr-3">
      <FontAwesomeIcon icon={faSearch} />
      <input />
    </StyledSearchContainer>
  );
}

export default Search;
