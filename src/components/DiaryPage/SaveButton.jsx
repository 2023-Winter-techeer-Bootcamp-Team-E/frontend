import React from 'react';
import styled from 'styled-components';

const SaveButtonClick = () => {
    //기능 넣기
    console.log('SaveButton clicked!');
  };

function SaveButton(){

   return (
    <SaveButtonContainer onClick={SaveButtonClick}>
        저장하기
    </SaveButtonContainer>
   ); 
}

const SaveButtonContainer = styled.div`
    width: 10.375rem;
    height: 2.8125rem;
    flex-shrink: 0;
    border-radius: 1.875rem;
    background: #C1C3FF;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
    }
    
    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export default SaveButton;