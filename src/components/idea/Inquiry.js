import React from "react";
import styled from "styled-components";
import Profile from "../../assets/img/Default Profile.png";
import CustomContainer from "../CustomContainer";
import CustomText, { CustomLabelText } from "../CustomText";
import InputForm from "../InputForm";

const StyledContainer = styled.div`
  padding: 120px 90px;
  width: 100%;
`;

function Inquiry() {
  return (
    <StyledContainer>
      <CustomText text={"계정 설정"} />
      <CustomLabelText
        text={"계정 설정에서는 프로필 사진과 닉네임을 설정할 수 있습니다"}
      />
      <hr className="w-100" />
      <CustomContainer
        style={{ marginTop: 50, width: "80%", alignItems: "center" }}
      >
        <div style={{ marginRight: 70 }}>
          <img src={Profile} style={{ width: "180px", height: "180px" }} />
        </div>
        <div style={{ flex: 1 }}>
          <CustomContainer
            style={{ alignItems: "center", marginBottom: "3rem" }}
          >
            <CustomLabelText
              fontSize={12}
              text={"닉네임"}
              style={{ marginBottom: "1rem", marginRight: "2rem" }}
            />
            <InputForm style={{ flex: 1 }} />
          </CustomContainer>
          <CustomContainer style={{ alignItems: "center" }}>
            <CustomLabelText
              fontSize={12}
              text={"이메일"}
              style={{ marginBottom: "1rem", marginRight: "2rem" }}
            />
            <InputForm style={{ flex: 1 }} />
          </CustomContainer>
        </div>
      </CustomContainer>
    </StyledContainer>
  );
}

export default Inquiry;
