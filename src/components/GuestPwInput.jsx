// 게스트 비밀번호 인풋
import React, { useState } from 'react';
import styled from 'styled-components';

function GuestPwInput({ text, handleTextChange, placeholder, type }) {
  return (
    <GuestPwInputContainer>
      <TextInput
        type={type}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder={placeholder}
      />
    </GuestPwInputContainer>
  );
}

//로그인인풋
const GuestPwInputContainer = styled.div`
  width: 21.50194rem;
  height: 4.09844rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 3px solid #C1E3FF;
  background: #fff;
  left: 7.96rem;
  top: 15.32rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
`;

const TextInput = styled.input`
  position: absolute;
  height: 1.93538rem;
  width: 20.25463rem;
  color: #000;
  font-family: Arial;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
  text-align: center;
  left: 1rem;
  &::placeholder {
    color: #AAAAAA;
  }
`;
export default GuestPwInput;