import React, { useState } from 'react';
import styled from 'styled-components';
import OpenEye from '../../src/assets/img/OpenEye.png';
import CloseEye from '../../src/assets/img/CloseEye.png';
import { set } from 'date-fns';

const LoginInputTypePW = ({ text, handleTextChange, placeholder, font }) => {
  const [hide, setHide] = useState(true);
  const [focus, setFocus] = useState(false);
  const handleHide = () => {
    setHide(!hide);
  };
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <LoginInputContainer onFocus={handleFocus} onBlur={handleBlur}>
      <TextInput
        type={hide ? 'password' : 'text'}
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        fontFamily={hide ? font : 'bmjua'}
      />
      {focus && (
        <PWHideButton
          src={hide ? OpenEye : CloseEye}
          alt={hide ? 'Show Password' : 'Hide Password'}
          onMouseDown={(e) => {
            e.preventDefault();
            handleHide();
          }}
        />
      )}
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
const PWHideButton = styled.img`
  width: 2.5rem;
  z-index: 10;
  margin-left: 30rem;
  cursor: pointer;
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
