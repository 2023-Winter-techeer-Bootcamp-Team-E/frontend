import React from 'react';
import styled from 'styled-components';

const LoginInput = ({ text, handleTextChange, placeholder, type }) => {
  return (
    <LoginInputContainer>
      <TextInput
        type={type}
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
      />
    </LoginInputContainer>
  );
};

const LoginInputContainer = styled.div`
  width: 36.5625rem;
  height: 4.8125rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 3px solid #c1e3ff;
  background: #fff;
  display: flex;
  align-items: center; /*수직 정렬- 중간*/
  justify-content: flex-start; //내부정렬- 좌로
`;

const TextInput = styled.input`
  position: absolute;
  height: 4rem;
  width: 33rem;
  background: #fff;
  color: #000;
  font-family: Arial;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  border: none;
  outline: none;
  text-align: left; /* 수정된 부분 */
  left: 1rem;
  &::placeholder {
    color: #aaaaaa; /* 원하는 색상으로 변경하세요 */
  }
`;

export default LoginInput;
