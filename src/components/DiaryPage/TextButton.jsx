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
  width: 12.375rem;
  height: 3.0125rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  background: #C1C3FF;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  right: 6.4rem;
  bottom: 15.21rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  }

  color: #fff;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default TextButton;
