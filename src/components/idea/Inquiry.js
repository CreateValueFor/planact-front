import React from "react";
import styled from "styled-components";
import Profile from "../../assets/img/Default Profile.png";
import CustomContainer from "../CustomContainer";
import CustomText, { CustomLabelText } from "../CustomText";
import InputForm from "../InputForm";
import { Route } from "react-router-dom";
import Kakao from "../../assets/img/KakaoChannelBg.png";
import ReactHtmlParser from "react-html-parser";
import usage from "../../assets/docs/usage";
import collect from "../../assets/docs/collect";

const StyledContainer = styled.div`
  padding: 120px 90px;
  width: 100%;
`;

const CollectRoutes = () => {
  return (
    <>
      <InquiryContentsText
        title="개인정보처리방침"
        subTitle="PLANACT 개인정보처리방침입니다."
      />
      <CustomContainer
        style={{ marginTop: 50, width: "80%", alignItems: "center" }}
      />
      <div>{ReactHtmlParser(collect)}</div>
    </>
  );
};

const UsageRoutes = () => {
  return (
    <>
      <InquiryContentsText
        title="이용약관"
        subTitle="PLANACT 이용약관입니다."
      />
      <CustomContainer
        style={{ marginTop: 50, width: "80%", alignItems: "center" }}
      />
      <div>{ReactHtmlParser(usage)}</div>
    </>
  );
};

const AskRoutes = () => {
  const methodStyle = {
    fontSize: "13px",
    lineHeight: "24px",
    color: "#313340",
    marginLeft: "1rem",
  };

  return (
    <>
      <InquiryContentsText
        title="문의"
        subTitle="PLANACT 관련 문의사항은 다음으로 부탁드립니다."
      />
      <CustomContainer
        style={{ marginTop: 50, width: "80%", alignItems: "center" }}
      >
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <img src={Kakao} />
            <CustomLabelText
              text="카카오톡 채널: plan_act"
              style={methodStyle}
            />
          </div>
          <div>
            <img src={Kakao} />
            <CustomLabelText text="인스타그램: plan_act" style={methodStyle} />
          </div>
        </div>
      </CustomContainer>
    </>
  );
};

const ProfileRoutes = () => {
  return (
    <>
      <InquiryContentsText
        title="계정 설정"
        subTitle="계정 설정에서는 프로필 사진과 닉네임을 설정할 수 있습니다."
      />
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
    </>
  );
};

const InquiryContentsText = ({ title, subTitle }) => {
  return (
    <>
      <CustomText text={title} />
      <CustomLabelText text={subTitle} />
      <hr className="w-100" />
    </>
  );
};

function Inquiry() {
  return (
    <StyledContainer>
      <Route path="/idea/inquiry/profile" render={ProfileRoutes} />
      <Route path="/idea/inquiry/ask" render={AskRoutes} />
      <Route path="/idea/inquiry/usage" render={UsageRoutes} />
      <Route path="/idea/inquiry/collect" render={CollectRoutes} />
    </StyledContainer>
  );
}

export default Inquiry;
