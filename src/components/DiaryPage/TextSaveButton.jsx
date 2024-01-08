import React from 'react';
import styled from 'styled-components';

const TextSaveClick = () => {
    //기능 넣기
    console.log('TextSave clicked!');
  };

function TextSave(){

   return (
    <TextSaveContainer onClick={TextSaveClick}>
        입력
    </TextSaveContainer>
   ); 
}

const TextSaveContainer = styled.div`
    width: 3.25rem;
    height: 1.6875rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    background: #D6B6FF;
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
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

export default TextSave;