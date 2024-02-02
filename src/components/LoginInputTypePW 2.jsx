import React from 'react';
import styled from 'styled-components';

const LoginInputTypePW = ({ text, handleTextChange, placeholder, font }) => {
  return (
    <LoginInputContainer>
      <TextInput
        type="password"
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        fontFamily={font}
      />
    </LoginInputContainer>
  );
};

const LoginInputContainer = styled.div`
  width: 36.5625rem;
  height: 4.8125rem;
  flex-shrink: 0;
  display: flex;
  align-items: center; /*수직 정렬- 중간*/
  justify-content: flex-start; //내부정렬- 좌로
`;

const TextInput = styled.input`
  position: absolute;
  width: 33.5625rem;
  height: 4.8125rem;
  background: #fff;
  color: #464646;
  font-size: 1.4rem;
  font-family: ${({ fontFamily }) => fontFamily};
  border-radius: 1.25rem;
  border: 3px solid #c1e3ff;
  outline: none;
  text-align: left;
  padding-left: 1rem;
  &::placeholder {
    color: #bbb;
  }
  &:focus {
    border: 0.4rem solid #a1d6ff;
  }
`;

export default LoginInputTypePW;
