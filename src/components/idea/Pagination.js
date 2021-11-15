import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { usePlans } from "../../modules/Plans/hook";
const StyledPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 2rem;
`;

const StyledPaginationItem = styled.div`
  width: 30px;
  height: 30px;
  background: #eff7f9;
  border-radius: 10px;
  margin-right: 5px;
  margin-left: 5px;
  font-size: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  &:hover {
    background: #089bab;
    color: #fff;
  }
`;

function Pagination() {
  const { count, page } = usePlans();
  const pages = Math.round(count / 6);
  const pagination = [...Array(pages).keys()].map((key) => key + 1);

  return (
    <StyledPaginationContainer>
      <StyledPaginationItem>
        <FontAwesomeIcon icon={faChevronLeft} />
      </StyledPaginationItem>
      {pagination.map((pageElem, idx) => (
        <StyledPaginationItem
          key={idx}
          style={
            pageElem === page ? { color: "#fff", background: "#089bab" } : {}
          }
        >
          {pageElem}
        </StyledPaginationItem>
      ))}
      <StyledPaginationItem>
        <FontAwesomeIcon icon={faChevronRight} />
      </StyledPaginationItem>
    </StyledPaginationContainer>
  );
}

export default Pagination;
