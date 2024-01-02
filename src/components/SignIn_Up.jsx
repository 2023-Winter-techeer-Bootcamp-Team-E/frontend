import React from 'react';
import styled from 'styled-components';

const SignIn_Up = ({ text }) => {

    const handleButtonClick = () => {
        console.log("The button has been pressed.");
    };

    return (
        <MainBtn onClick={handleButtonClick}>
            <PlaceText>
                {text}
            </PlaceText>
        </MainBtn>
    );
};

const MainBtn = styled.div`
  position: absolute;
  width: 36.5625rem;
  height: 4.8125rem;
  border-radius: 1.25rem;
  border: 5px solid #C1E3FF;
  background: #B6DEFD;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`

const PlaceText = styled.p`
  position: absolute;
  color: #FFF;
  font-family: Arial Black;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  left: 50%;
  transform: translateX(-50%);
`

export default SignIn_Up;