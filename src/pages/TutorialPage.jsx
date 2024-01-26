import React, { useState } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import LargeSketchbook from '../components/LargeSketchbook';
import LogoIcon from '../assets/img/WebIcon.png';
import StartButton from '../components/SignIn_Up';
import arrowlbtn from '../assets/img/Tutorial/arrowlbtn.png';
import arrowrbtn from '../assets/img/Tutorial/arrowrbtn.png';

function TutorialPage(props) {
  const [pageNum, setPageNum] = useState(1);

  const PageRender = () => {
    switch (pageNum) {
      case 1:
        return (
          <Case1Div>
            <WrapperLargeSketchbook>
              <LargeSketchbook />
            </WrapperLargeSketchbook>
            <SketDiv>
              <LogoIconImg src={LogoIcon} />
              <CommentDiv>
                <CommentDivTitle>하루 연결 튜토리얼</CommentDivTitle>
                <CommentDivText>
                  소중한 사람들과 하루를 공유하며 즐길 수 있는 공간, <br />
                  하루 연결에 오신것을 환영합니다!
                </CommentDivText>
                <StartButtonStyled>
                  <StartButton text="시작하기" onClick={() => setPageNum(1)} />
                </StartButtonStyled>
              </CommentDiv>
            </SketDiv>
          </Case1Div>
        );
    }
  };

  return (
    <BackLayout>
      <PageFrame>{PageRender()}</PageFrame>
    </BackLayout>
  );
}

const BackLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(to bottom, #c1e3ff 60%, #ffffff);
  overflow: hidden;
`;
const PageFrame = styled.div`
  position: absolute;
  width: 108rem;
  height: 70rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const Case1Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const slideUp = keyframes`
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const WrapperLargeSketchbook = styled.div`
  position: absolute;
  top: 7.75rem;
`;
const SketDiv = styled.div`
  margin-top: 7rem;
  position: absolute;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;
const LogoIconImg = styled.img`
  width: 32rem;
  height: 32rem;
  margin: 5rem;
`;
const CommentDiv = styled.div`
  height: 32rem;
  margin: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;
const CommentDivTitle = styled.p`
  font-family: 'bmjua';
  font-size: 2rem;
  animation: ${slideUp} 1s ease 0.7s both;
`;
const CommentDivText = styled.p`
  font-family: 'bmjua';
  font-size: 2rem;
  text-align: center;
  color: #5fb9ff;
  line-height: 2;
  animation: ${slideUp} 1s ease 1.4s both;
`;

const StartButtonStyled = styled.div`
  margin: 2rem;
  animation: ${slideUp} 1s ease 2.1s both; /* SlideUp 애니메이션 적용, 1.5s 지연 */
`;
export default TutorialPage;