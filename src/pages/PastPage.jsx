import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigateBar from '../components/NavigateBar';
import HomeBtn from '../components/DiaryPage/HomeBtn';
import useDiaryIdStore from '../stores/useDiaryIdStore';
import pastSketchbookImg from '../assets/img/pastSketchbook.png';
import EmptyLogo2 from '../assets/img/EmptyLogo2.png';
import pencil from '../assets/img/pencil.png';
import PastInner from '../components/DiaryPage/PastInner';

function PastPage({ userName = 'userNameNull', userId = 'userIdNull', move }) {
  const { diaryId } = useDiaryIdStore();

  return (
    <BackLayout>
      <PageFrame>
        <WrapperNavigateBar>
          <NavigateBar userName={userName} userId={userId} />
        </WrapperNavigateBar>
        <SmallSketch>
          <StyledPastSketchbook
            src={pastSketchbookImg}
            alt="pastSketchbookImg"
          />{' '}
          <StyledEmptyLogo2>
            <img src={EmptyLogo2} alt="EmptyLogo2" />
            <div>
              <StyledText>
                하루
                <br />
                연결
              </StyledText>
            </div>
          </StyledEmptyLogo2>
          <Styledpencil src={pencil} alt="pencil" />
        </SmallSketch>
        <WrapperInnerImg>
          <PastInner diaryId={diaryId} />
        </WrapperInnerImg>
        <WrapperDHomeButton>
          <HomeBtn />
        </WrapperDHomeButton>
      </PageFrame>
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
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-y: hidden;
`;
const PageFrame = styled.div`
  position: absolute;
  width: 108rem;
  height: 70rem;
  display: flex;
  top: 0;
  justify-content: center;
`;

const WrapperNavigateBar = styled.div`
  position: absolute;
`;

const Styledpencil = styled.img`
  position: absolute;
  right: -18.8rem;
  bottom: 22.5rem;
  width: 23.2rem;
  height: 26.8em;
`;

const SmallSketch = styled.div`
  position: absolute;
  top: -2.5rem;
  bottom: 0;
  z-index: 0;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const StyledPastSketchbook = styled.img`
  width: 73.25rem;
  height: 60.18063rem;
  top: 10rem;
`;

const StyledEmptyLogo2 = styled.div`
  position: absolute;
  left: 28.8rem;
  top: 2.8em;
  img {
    width: 17.125rem;
    height: 12.25rem;
  }
`;

const StyledText = styled.text`
  position: relative;
  color: #2c2c2c;
  bottom: 7rem;
  left: 5rem;
  font-size: 2.4rem;
  font-family: 'seolleim';
  line-height: 1;
`;
const WrapperDHomeButton = styled.div`
  position: absolute;
  right: 7.19rem;
  bottom: 8.8rem;
  display: flex;
  z-index: 10;
`;

const WrapperInnerImg = styled.div`
  position: absolute;
  margin-top: -3rem;
  left: 22.7rem;
  z-index: 1;
`;

export default PastPage;
