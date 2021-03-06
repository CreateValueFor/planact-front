import React, { useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { usePlans } from "../../modules/Plans/hook";
import useResponsive from "../../Responsive";
const StyledPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0px;
  /* margin-bottom: 3rem; */
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
  const {
    count,
    page,
    pagination,
    changePage,
    subtractPage,
    addPage,
  } = usePlans();
  const pages = Math.round(count / 6);

  const pageClick = useCallback((e) => {
    changePage(e.target.innerText);
  }, []);
  const { isMobile } = useResponsive();

  return (
    <StyledPaginationContainer
      style={isMobile ? { marginBottom: 100 } : { width: "auto" }}
    >
      <StyledPaginationItem onClick={subtractPage}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </StyledPaginationItem>
      {[...Array(page)].map((pageElem, idx) => (
        <StyledPaginationItem
          key={idx}
          style={
            idx + 1 === pagination * 1
              ? { color: "#fff", background: "#089bab" }
              : {}
          }
          onClick={pageClick}
        >
          {idx + 1}
        </StyledPaginationItem>
      ))}
      <StyledPaginationItem onClick={addPage}>
        <FontAwesomeIcon icon={faChevronRight} />
      </StyledPaginationItem>
    </StyledPaginationContainer>
  );
}

export default Pagination;
