import React, { useCallback } from "react";
import { Form, FormGroup } from "react-bootstrap";
import styled from "styled-components";

const StyledInputForm = styled(Form.Group)`
  input {
    /* PIVO GREY/Light/04 */

    border: 1.42029px solid #d5d6d8;
    box-sizing: border-box;
    border-radius: 30px;
    background: #ffffff;
    /* PIVO GREY/Light/04 */
  }
`;

const StyledMobileInput = styled.div`
  background: ${props=>props.disabled ? "#F7F7F7":  "#FFFFFF"};
  
  border: 2px solid #D5D6D8;
  box-sizing: border-box;
  border-radius: 30px;
  padding:0px 30px;
  height:60px;
  p{
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 18px;
    color: #83848C;
    margin-bottom: 0px;
  }
  input{
    padding:0;
    outline:none;
    border:none;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #313340;
    &:disabled{
      background-color: #F7F7F7;
    }
  }
`;

export function MobileInputForm({setValue,
  placeholder,
  value,
  disabled,
  text,
  type,
  className,
  
  style,}){
    const onChange = useCallback(
      (e) => {
        const {
          target: { value },
        } = e;  
        
        setValue(value);
      },
      [setValue]
    );
  
    return (
      <StyledMobileInput disabled={disabled} className="w-100">
        <p>{text}</p>
        <Form.Control 
          value={value}
          onChange={onChange}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          name={type}
        />
      </StyledMobileInput>
    );
}


function InputForm({
  setValue,
  placeholder,
  value,
  disabled,
  text,
  type,
  className,
  style,
}) {
  const onChange = useCallback(
    (e) => {
      const {
        target: { value },
      } = e;

      setValue(value);
    },
    [setValue]
  );

  return (
    <StyledInputForm
      className={`mb-3 ${className}`}
      controlId={`formBasic${type}`}
      style={style}
    >
      <Form.Control
        disabled={disabled}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        name={type}
      />
      {text && <Form.Text>{text}</Form.Text>}
    </StyledInputForm>
  );
}

export default InputForm;
