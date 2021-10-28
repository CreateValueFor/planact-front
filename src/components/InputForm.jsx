import React from "react";
import { Form } from "react-bootstrap";
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

function InputForm({ placeholder, text, type, className, style }) {
  return (
    <StyledInputForm
      className={`mb-3 ${className}`}
      controlId={`formBasic${type}`}
      style={style}
    >
      <Form.Control type={type} placeholder={placeholder} name={type} />
      {text && <Form.Text>{text}</Form.Text>}
    </StyledInputForm>
  );
}

export default InputForm;
