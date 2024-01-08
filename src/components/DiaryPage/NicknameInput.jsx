import React, { useState } from 'react';
import styled from 'styled-components';


const NicknameInputClick = () => {
  //기능 넣기
  console.log('NicknameInput clicked!');
};

function NicknameInput(){

 return (
  <NicknameInputContainer onClick={NicknameInputClick}>
      <TextInput
        placeholder="닉네임을 입력하세요"
      />
  </NicknameInputContainer>
 ); 
}


const NicknameInputContainer = styled.div`
width: 11.5rem;
height: 1.9375rem;
flex-shrink: 0;
  border-radius: 0.3125rem;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: flex-center;

`;

const TextInput = styled.input`
  position: absolute;
  width: 9.75rem;
  color: #AAA;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
  left: 1rem;
  text-align: left;
  &::placeholder {
    color: #AAAAAA;
  }
`;

export default NicknameInput;
