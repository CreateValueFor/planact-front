import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { usePlans } from "../../modules/Plans/hook";
import { useMediaQuery } from "react-responsive";
const StyledSearchContainer = styled.div`
  height: 36px;
  /* width: 240px; */
  border: 1px solid #d5d6d8;
  box-sizing: border-box;
  border-radius: 100px;
  display: flex;
  align-items: center;

  padding: 1rem;
  input {
    border: none;
    flex: 1;
    display: inline-block;
    outline: none;
    margin-left: 0.25rem;
    &::placeholder {
      /* Subheading/Extra Small */
      font-family: "Caros Soft";
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 137% */
      /* PIVO GREY/Light/03 */
      color: #acadb2;
    }
  }
`;

function Search() {
  const { searchPlanByKeyword } = usePlans();
  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      searchPlanByKeyword(e.target.value);
    }
  };
  return (
    <StyledSearchContainer
      className="mr-3"
      style={
        isPc
          ? { marginLeft: "3rem", marginBottom: "2.25rem" }
          : { marginBottom: "2.25rem" }
      }
    >
      <FontAwesomeIcon icon={faSearch} style={{ color: "#d5d6d8" }} />
      <input placeholder="Search" onKeyPress={onKeyPress} />
    </StyledSearchContainer>
  );
}

export default Search;
