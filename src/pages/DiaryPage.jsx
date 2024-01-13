import React from 'react';
import styled from 'styled-components';
import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import BasicSticker from '../components/BasicSticker';
import RightSticker from '../components/DiaryPage/RightSticker';
import DHomeButton from '../components/DiaryPage/DHomeButton';
import SaveButton from '../components/DiaryPage/SaveButton';
import TextButton from '../components/DiaryPage/TextButton';
import NicknameInput from '../components/DiaryPage/NicknameInput';
import TextSave from '../components/DiaryPage/TextSaveButton';

//NicknameInput, TextSave는 직관적으로 보기 위해 임의로 나타냄
function CalendarPage({
  userName = 'userNameNull',
  userId = 'userIdNull',
  move,
}) {
  return (
    <BackLayout>
      <PageFrame>
        <WrapperNavigateBar>
          <NavigateBar userName={userName} userId={userId} />
        </WrapperNavigateBar>

        <WrapperLargeSketchbook>
          <LargeSketchbook />
        </WrapperLargeSketchbook>

        <WrapperBasicSticker>
          <BasicSticker />
        </WrapperBasicSticker>

        <Diary />

        <WrapperRightSticker>
          <RightSticker />
        </WrapperRightSticker>

        <WrapperDHomeButton>
          <DHomeButton move={move} />
        </WrapperDHomeButton>

        <WrapperSaveButton>
          <SaveButton />
        </WrapperSaveButton>

        <TextButton />

        {/* NicknameInput, TextSave는 직관적으로 보기 위해 임의로 나타냄 */}
        <NicknameInputContainer>
          <NicknameInput />
        </NicknameInputContainer>

        <TextSaveContainer>
          <TextSave />
        </TextSaveContainer>
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
const Diary = styled.div`
  border-radius: 1.875rem;
  background: #fffee1;
  position: absolute;
  width: 65.0625rem;
  height: 50.875rem;
  top: 14.6rem;
  flex-shrink: 0;
  z-index: 2;
`;
const WrapperNavigateBar = styled.div`
  position: absolute;
`;
const WrapperLargeSketchbook = styled.div`
  position: absolute;
  top: 7.9375rem;
`;
const WrapperBasicSticker = styled.div`
  position: absolute;
  top: 17rem;
  left: 4.56rem;
`;
const WrapperRightSticker = styled.div`
  position: absolute;
  top: 17.87rem;
  margin-left: 84.19rem;
`;

const WrapperDHomeButton = styled.div`
  position: absolute;
  right: 5.19rem;
  bottom: 5.4rem;
  display: flex;
  z-index: 10;
`;

const WrapperSaveButton = styled.div`
  position: absolute;
  right: 8.56rem;
  bottom: 5.31rem;
  display: flex;
  z-index: 10;
`;

//임의의 값_ 위치 이동함
const NicknameInputContainer = styled.div`
  position: absolute;
  left: 34.4375rem;
  top: 32.1875rem;
  display: flex;
  z-index: 10;
`;

const TextSaveContainer = styled.div`
  position: absolute;
  left: 46.4375rem;
  top: 32.3rem;
  display: flex;
  z-index: 10;
`;
export default CalendarPage;
