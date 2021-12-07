import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Profile from "../../assets/img/Default Profile.png";
import CustomContainer from "../CustomContainer";
import CustomText, { CustomLabelText, CustomLinkText } from "../CustomText";
import InputForm, { MobileInputForm } from "../InputForm";
import { Route } from "react-router-dom";
import Kakao from "../../assets/img/Kakao Channel.png";
import Instagram from "../../assets/img/Instagram.png";
import Email from "../../assets/img/mail.png";
import ReactHtmlParser from "react-html-parser";
import usage from "../../assets/docs/usage";
import collect from "../../assets/docs/collect";
import useResponsive from "../../Responsive";
import useReactRouter from "use-react-router";
import useViews from "../../modules/View/hooks";
import useAuth from "../../modules/User/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import LeftChevron from "../../assets/img/LeftChevron.svg";
import ChangeBtn from "../../assets/img/profileChange.svg";
import DeleteBtn from "../../assets/img/profileDelete.svg";
import CustomButton from "../CustomButton";


const StyldMobileTobbar = styled.div`
  position: relative;
  .icon {
    position: absolute;
    left: 35px;
    top: calc(50% - 9px);
    transform: translateY(-50%);
  }
  p {
    display: block;
    margin-bottom: 0px;
    text-align: center;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    /* line-height: 36px; */
    /* identical to box height, or 200% */

    /* PIVO GREY/PIVO GREY */

    color: #313340;
  }
`;

function InquiryMobileTobBar({ title }) {
  const width = window.innerWidth;
  const { history } = useReactRouter();
  const { changeMAin } = useViews();
  const onClickBack = () => {
    changeMAin();
    history.push("/");
  };
  return (
    <StyldMobileTobbar style={{ width, marginLeft: "-.75rem" }}>
      <div >
        <div className="icon" onClick={onClickBack}>
          <img src={LeftChevron} alt="leftChevron"/>
          
        </div>
        <p>{title}</p>
      </div>
      <hr />
    </StyldMobileTobbar>
  );
}

const StyledContainer = styled.div`
  padding: ${(props) => (props.isMobile ? "0px" : "120px 90px")};
  width: 100%;
  ${(props) =>
    props.isMobile &&
    "display: flex;flex-direction: column;align-items: center;"}

  .flex-box {
    flex-direction: column;
  }
  #profile-contents {
    margin-top: 50px;
    width: 80%;
    align-items: center;
    user-select: auto;
    flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
    & > div:first-child {
      margin-right: 70px;
    }
    & > flex-box {
      align-items: ${(props) => (props.isMobile ? "center" : "auto")};
    }

    //when Mobile
    ${(props) =>
      props.isMobile &&
      "margin:0; div:first-child{margin:0; margin-bottom:2rem;} label{    align-self: start;}"}
  }

  #usage-contents {
    div:first-child {
      margin-top: 50px;
      width: 80%;
      align-items: center;
    }
    ${(props) =>
      props.isMobile &&
      "padding:0 1rem; div:first-child{margin:0;} div:last-child{height:auto;}"}
  }

  #collect-contents {
    div:first-child {
      margin-top: 50px;
      width: 80%;
      align-items: center;
    }
    ${(props) =>
      props.isMobile &&
      "padding:0 1rem; div:first-child{margin:0;} div:last-child{height:auto;}"}
  }
  #inquiry-contents {
    & > div:first-child {
      margin-top: 50px;
      width: 80%;
      align-items: center;
    }
    ${(props) =>
      props.isMobile &&
      "width:100%; margin-top:35px; padding:0 1rem; div:first-child{margin:0;}"}
  }
`;

const StyledAgreementContainer = styled.div`
  /* height: 100vh; */
  height: 65vh;
  overflow-y: scroll;
`;

const StyledInquiryMethodContainer = styled.div`
  display: flex;
`;

const CollectRoutes = () => {
  return (
    <div id="collect-contents">
      <InquiryContentsText
        title="개인정보처리방침"
        subTitle="PLANACT 개인정보처리방침입니다."
      />
      <CustomContainer />
      <StyledAgreementContainer>
        {ReactHtmlParser(collect)}
      </StyledAgreementContainer>
    </div>
  );
};

const UsageRoutes = () => {
  return (
    <div id="usage-contents">
      <InquiryContentsText
        title="이용약관"
        subTitle="PLANACT 이용약관입니다."
      />
      <CustomContainer />
      <StyledAgreementContainer>
        {ReactHtmlParser(usage)}
      </StyledAgreementContainer>
    </div>
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
      <CustomContainer id="inquiry-contents" style={{}}>
        <div>
          <StyledInquiryMethodContainer style={{ marginBottom: "1rem" }}>
            <img src={Kakao} alt="kakao" />
            <CustomLinkText
              text="카카오톡 채널: plan_act"
              style={methodStyle}
              href="http://pf.kakao.com/_cuVqb"
            />
          </StyledInquiryMethodContainer>
          <StyledInquiryMethodContainer style={{ marginBottom: "1rem" }}>
            <img src={Instagram} alt="insta" />
            <CustomLinkText
              text="인스타그램: planact.official"
              style={methodStyle}
              href="https://www.instagram.com/planact.official/"
            />
          </StyledInquiryMethodContainer>
          <StyledInquiryMethodContainer>
            <img src={Email} alt="mail" />
            <CustomLinkText
              text="이메일: contact@planact.co.kr"
              style={methodStyle}
              href="mailto:contact@planact.co.kr"
            />
          </StyledInquiryMethodContainer>
        </div>
      </CustomContainer>
    </>
  );
};

const StyledProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px !important;
  img{
    cursor:'pointer'
  }
`;

const ProfileRoutes = ({ email, nick,isMobile }) => {
  const [curNick, setCurNick] = useState();
  const [base64Image, setBase64Image] = useState("");
  const [image, setImage] = useState();
  const [isSend, setIsSend] = useState(false)
  const {updateProfile,thumb} = useAuth();

  const imageRef = useRef();
  
  const onRemoveImage = useCallback(()=>{
    setImage();
    setBase64Image("")
  },[])

  const onImageClick = useCallback((e)=>{
    let reader = new FileReader();
  
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64){
        setBase64Image(base64.toString())
        console.log(base64.toString())
        
      }
    }
    if(e.target.files[0]){
      const file = e.target.files[0];
      reader.readAsDataURL(file);
      setImage(file);

    }

  },[])

  const onSubmit = useCallback(()=>{
    setIsSend(true);
  },[image, nick])
  
  useEffect(()=>{
    if(isSend){

      let profile = new FormData();
      console.log(curNick);
      profile.append("nick",curNick)
      profile.append("email",email)
      profile.append("thumb",image)
      updateProfile(profile)
      setIsSend(false);
    }
  },[isSend])

  useEffect(()=>{
    setCurNick(nick)
    setImage(thumb)
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64){
        console.log(base64.toString())
        setBase64Image(base64.toString())
      }
    }
    if(thumb){
      reader.readAsDataURL(thumb);
    }
  },[])

  return (
    <>
      <InquiryContentsText
        title="계정 설정"
        subTitle="계정 설정에서는 프로필 사진과 닉네임을 설정할 수 있습니다."
      />
      <CustomContainer
        id="profile-contents"
        style={{ marginTop: isMobile? 20:50 , width: isMobile ?"100%" : "80%", alignItems: "center" }}
      >
        <div>
          <img
            src={base64Image? base64Image: Profile}
            style={{ width: "180px", height: "180px" }}
            alt="profile"
            
          />
        </div>
        <div style={{ flex: 1, paddingLeft:isMobile?"1rem":"auto",paddingRight:isMobile?"1rem":"auto" ,width: isMobile? "100%":"auto" }}>
          {isMobile ? (
            <>
              <StyledProfileContainer>
                <input onClick={onImageClick}  ref={imageRef} type="file" style={{display:"none"}}   />
                <img src={ChangeBtn} onClick={()=>{imageRef.current.click()}} alt="change" style={{marginRight:".5rem"}}/>
                <img src={DeleteBtn} onClick={onRemoveImage} alt="delete" style={{marginLeft:".5rem"}}/>
              </StyledProfileContainer>
              <div>
                <MobileInputForm
                  value={curNick}
                  setValue={setCurNick}
                  text="닉네임"
                  
                />
                <MobileInputForm
                  
                  value={email}
                  text="이메일"
                  disabled={true}
                />
              </div>
              <CustomButton
            text="수정하기"
            type="submit"
            onClick={onSubmit}
            style={{ marginBottom: 28,marginTop:"32px", height: "60px" }}
          />
            </>
          ):
          (
            <>
          <CustomContainer style={{ marginBottom: "3rem" }}>
            <CustomLabelText
              fontSize={12}
              text={"닉네임"}
              style={{ marginBottom: "1rem", marginRight: "2rem" }}
            />
            <InputForm style={{ flex: 1 }} value={nick} disabled />
          </CustomContainer>
          <CustomContainer>
            <CustomLabelText
              fontSize={12}
              text={"이메일"}
              style={{ marginBottom: "1rem", marginRight: "2rem" }}
            />
            <InputForm style={{ flex: 1 }} value={email} disabled />
          </CustomContainer>
            </>
          )
          }
        </div>
      </CustomContainer>
    </>
  );
};

const InquiryContentsText = ({ title, subTitle }) => {
  const { isMobile } = useResponsive();
  return (
    <>
      {!isMobile && (
        <>
          <CustomText text={title} />
          <CustomLabelText text={subTitle} />
          <hr className="w-100" />
        </>
      )}
    </>
  );
};



function Inquiry() {
  const { isMobile } = useResponsive();
  const { viewDetail, page } = useViews();
  const { email, nick } = useAuth();

  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (page) {
      case "usage":
        setTitle("이용약관");
        break;
      case "collect":
        setTitle("개인정보 수집동의");
        break;
      case "inquiry":
        setTitle("문의");
        break;
      case "profile":
        setTitle("프로필 설정");
        break;
      default:
        break;
    }
  }, [page]);

  useEffect(() => {
    viewDetail();
  }, []);
  return (
    <>
      {isMobile && <InquiryMobileTobBar title={title} />}
      <StyledContainer isMobile={isMobile}>
        <Route
          path="/inquiry/profile"
          render={() => <ProfileRoutes email={email} isMobile={isMobile} nick={nick} />}
        />
        <Route path="/inquiry/" exact render={AskRoutes} />
        <Route path="/inquiry/usage" render={UsageRoutes} />
        <Route path="/inquiry/collect" render={CollectRoutes} />
      </StyledContainer>
    </>
  );
}

export default Inquiry;
