import React, { useState } from 'react';
import styled from 'styled-components';

const LoginBar = ({ initialText, placeholder }) => {
  const [text, setText] = useState(initialText);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <LoginBarContainer>
      <TextInput
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
      />
    </LoginBarContainer>
  );
};

const LoginBarContainer = styled.div`
  position: absolute;
  width: 36.5625rem;
  height: 4.8125rem;
  top: 30%;
  left: 50%;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 3px solid #C1E3FF;
  background: #FFF;
  display: flex;
  align-items: center;      /*수직 정렬- 중간*/
  justify-content: flex-start;      //내부정렬- 좌로
`;

const TextInput = styled.input`
  color: #C4C4C4;
  font-family: 'Arial Black', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  border: none;
  outline: none;
  text-align: left; /* 수정된 부분 */
  left: -20%;
`;


export default LoginBar;
