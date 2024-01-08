import React from 'react';
import styled from 'styled-components';

const TextButtonClick = () => {
    //기능 넣기
    console.log('TextButton clicked!');
  };

function TextButton(){

   return (
    <TextButtonContainer onClick={TextButtonClick}>
        T
    </TextButtonContainer>
   ); 
}


//이 친구 다른 곳에서 쓰일 일이 없어서
//위치 여기서 조정할게요

const TextButtonContainer = styled.div`
  position: absolute;
    width: 3.5625rem;
    height: 3.5625rem;
    flex-shrink: 0;
    border-radius: 0.9375rem;
    background: #E7EEF9;
    left: 15.69rem;
    top: 13rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    }
    
    color: #000;
    font-family: BigshotOne;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

export default TextButton;