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
    <TextButtonContainer onClick={handleTextButtonClick}>T</TextButtonContainer>
  );
}

const TextButtonContainer = styled.div`
  position: absolute;
  width: 3.5625rem;
  height: 3.5625rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: #e7eef9;
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
