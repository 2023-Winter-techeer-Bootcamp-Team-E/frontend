import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import BasicSticker from '../components/BasicSticker';
import RightSticker from '../components/DiaryPage/RightSticker';
import DHomeButton from '../components/DiaryPage/DHomeButton';
import SaveButton from '../components/DiaryPage/SaveButton';
import TextButton from '../components/DiaryPage/TextButton';

import InnerImg from '../components/DiaryPage/InnerImg';
import useDiaryStore from '../stores/diaryStore';

const WEBSOCKET_URL = 'ws://127.0.0.1:8000/ws/harurooms/1/';
// const socket = new WebSocket(`${WEBSOCKET_URL}/ws/harurooms/${roomIndex}`);

function DiaryPage({ userName = 'userNameNull', userId = 'userIdNull', move }) {
  const [selectedTextBox, setSelectedTextBox] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [sharedText, setSharedText] = useState(''); // 모든 사용자에게 공유될 텍스트
  const websocket = useRef(null);
  const addSticker = useDiaryStore((state) => state.addSticker);
  const handleTextButtonClick = () => {
    setSelectedTextBox(true);
  };

  const handleStickerSelect = (image) => {
    setSelectedSticker(image); // 선택한 이미지 URL을 상태로 저장
  };

  useEffect(() => {
    const newSocket = new WebSocket(WEBSOCKET_URL);

    websocket.current = newSocket;
    // WebSocket 연결 설정

    // 웹소켓 연결이 성공했을 때
    newSocket.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    // 웹소켓 연결이 끊어졌을 때
    newSocket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`WebSocket 연결이 정상적으로 종료됨: ${event.code}`);
      }
    };

    // WebSocket 이벤트 리스너 설정
    newSocket.onmessage = (event) => {
      console.log('이벤트 발생');
      const data = JSON.parse(event.data);
      if (data.type === 'create_sticker') {
        // 서버로부터 받은 스티커 정보를 상태에 추가
        useDiaryStore.getState().addSticker({
          id: data.sticker_id,
          image: data.image,
          ...data.position,
        });
      } else if (data.type === 'image_drag') {
        console.log('드래그 발생');
        // 드래그 이벤트 처리
        // const { id, top2, left2 } = data.drag;
        useDiaryStore
          .getState()
          .updateSticker({ id: data.sticker_id, ...data.position });
      } else if (data.type === 'image_resize') {
        console.log('리사이즈 발생');

        // 리사이즈 이벤트 처리
        // const { id, width2, height2, top2, left2 } = data.resize;
        useDiaryStore.getState().updateSticker({
          id: data.sticker_id,
          ...data.position,
        });
      } else if (data.type === 'image_rotate') {
        console.log('로테이트 발생');

        // 회전 이벤트 처리
        // const { id, rotate2 } = data.rotate;
        useDiaryStore
          .getState()
          .updateSticker({ id: data.sticker_id, ...data.position });
      }
    };

    return () => {
      newSocket.close();
      console.log('WebSocket 연결 종료');
    };
  }, []);

  return (
    <BackLayout>
      <PageFrame>
        <WrapperNavigateBar>
          <NavigateBar userName={userName} userId={userId} />
        </WrapperNavigateBar>
        <WrapperLargeSketchbook>
          <LargeSketchbook />
        </WrapperLargeSketchbook>
        <WrapperInnerImg>
          <InnerImg
            selectedSticker={selectedSticker}
            setSelectedSticker={setSelectedSticker}
            selectedTextBox={selectedTextBox}
            setSelectedTextBox={setSelectedTextBox}
            sharedText={sharedText}
            websocket={websocket}
          />
        </WrapperInnerImg>
        <WrapperRightSticker>
          <RightSticker />
        </WrapperRightSticker>
        <WrapperDHomeButton>
          <DHomeButton move={move} />
        </WrapperDHomeButton>
        <WrapperSaveButton>
          <SaveButton />
        </WrapperSaveButton>
        <WrapperBasicSticker>
          <BasicSticker
            onStickerSelect={handleStickerSelect}
            websocket={websocket}
          />
        </WrapperBasicSticker>
        <TextButton onClick={handleTextButtonClick} />
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

const WrapperInnerImg = styled.div`
  position: absolute;
  top: 0;
  left: 22.7rem;
`;

export default DiaryPage;
