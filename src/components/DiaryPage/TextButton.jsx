import React from 'react';
import styled from 'styled-components';

function TextButton({ onClick, websocket }) {
  const handleTextButtonClick = () => {
    onClick();
    websocket.current.send(
      JSON.stringify({
        type: 'create_textbox',
        position: {
          width: 300,
          height: 100,
          x: 100,
          y: 100,
        },
      }),
    );
  };
  return (
    <TextButtonContainer onClick={handleTextButtonClick}>작성하기</TextButtonContainer>
  );
}

const TextButtonContainer = styled.div`
  position: absolute;
  width: 14.375rem;
  height: 3.0125rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  background: #C1C3FF;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  left: 4.2rem;
  top: 56.8rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.07);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
    background: #B1B4FF;
  }

  color: #fff;
  // font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default TextButton;
