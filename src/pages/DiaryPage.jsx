import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelectDateInfoStore } from '../../src/stores/useSelectDateInfoStore';
import { useParams } from 'react-router-dom';
import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import BasicSticker from '../components/BasicSticker';
import RightSticker from '../components/DiaryPage/RightSticker';
import DHomeButton from '../components/DiaryPage/DHomeButton';
import SaveButton from '../components/DiaryPage/SaveButton';
import TextButton from '../components/DiaryPage/TextButton';

import InnerImg from '../components/DiaryPage/InnerImg';
import useStickerStore from '../stores/stickerStore';
import useTextStore from '../stores/textStore';
import useDalleStore from '../stores/dalleStore';

const WEBSOCKET_URL = 'ws://127.0.0.1:8000/ws/harurooms/1/';
// const socket = new WebSocket(`${WEBSOCKET_URL}/ws/harurooms/${diaryId}`);

function DiaryPage() {
  const [selectedTextBox, setSelectedTextBox] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedDalle, setSelectedDalle] = useState(null);
  const [sharedText, setSharedText] = useState(''); // 모든 사용자에게 공유될 텍스트
  const selectedDateInfo = useSelectDateInfoStore((state) => state);
  const { diary_id } = useParams();
  const websocket = useRef(null);
  const addSticker = useStickerStore((state) => state.addSticker);
  const stickers = useStickerStore((state) => state.stickers);
  const texts = useTextStore((state) => state.texts);
  const addText = useTextStore((state) => state.addText);
  const dalles = useDalleStore((state) => state.dalles);

  const handleTextButtonClick = () => {
    setSelectedTextBox(true);
  };

  const handleStickerSelect = (image) => {
    setSelectedSticker(image); // 선택한 이미지 URL을 상태로 저장
  };

  const handleDalleSelect = (image) => {
    setSelectedDalle(image);
  };

  // console.log(stickers);
  console.log(texts);
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
      const data = JSON.parse(event.data);
      if (data.type === 'create_sticker') {
        console.log('스티커 생성');
        useStickerStore.getState().addSticker({
          id: data.sticker_id,
          image: data.image,
          ...data.position,
        });
      } else if (data.type === 'image_drag') {
        console.log('드래그 발생');
        useStickerStore
          .getState()
          .updateSticker({ id: data.sticker_id, ...data.position });
      } else if (data.type === 'image_resize') {
        console.log('리사이즈 발생');
        useStickerStore.getState().updateSticker({
          id: data.sticker_id,
          ...data.position,
        });
      } else if (data.type === 'image_rotate') {
        console.log('로테이트 발생');
        useStickerStore
          .getState()
          .updateSticker({ id: data.sticker_id, ...data.position });
      } else if (data.type === 'delete_object') {
        console.log('삭제');
        useStickerStore.getState().deleteSticker(data.object_id);
        useTextStore.getState().deleteText(data.object_id);
        useDalleStore.getState().deleteDalle(data.object_id);
      } else if (data.type === 'save_sticker') {
        console.log('스티커 저장');
        useStickerStore.getState().updateSticker({
          id: data.sticker_id,
          image: data.image,
          showOnly: true,
          ...data.position,
        });
      }

      // Dalle
      if (data.type === 'create_dalle') {
        console.log('Dalle 생성');
        useDalleStore.getState().addDalle({
          id: data.dalle_id,
          image: data.image,
          ...data.position,
        });
      } else if (data.type === 'dalle_drag') {
        console.log('dalle 드래그 발생');
        useDalleStore
          .getState()
          .updateDalle({ id: data.dalle_id, ...data.position });
      } else if (data.type === 'dalle_resize') {
        console.log('dalle 리사이즈 발생');
        useDalleStore.getState().updateDalle({
          id: data.dalle_id,
          ...data.position,
        });
      } else if (data.type === 'dalle_rotate') {
        console.log('dalle 로��이트 발생');
        useDalleStore
          .getState()
          .updateDalle({ id: data.dalle_id, ...data.position });
      } else if (data.type === 'save_dalle') {
        console.log('Dalle 저장');
        useDalleStore.getState().updateDalle({
          id: data.dalle_id,
          image: data.image,
          showOnly: true,
          ...data.position,
        });
      }

      // 텍스트 박스
      if (data.type === 'create_textbox') {
        console.log('텍스트 박스 생성');
        useTextStore.getState().addText({
          id: data.text_id,
          ...data.position,
        });
      } else if (data.type === 'text_drag') {
        console.log('텍스트 드래그 발생');
        useTextStore
          .getState()
          .updateText({ id: data.text_id, ...data.position });
      } else if (data.type === 'text_resize') {
        console.log('텍스트 리사이즈 발생');
        useTextStore
          .getState()
          .updateText({ id: data.text_id, ...data.position });
      } else if (data.type === 'text_input') {
        console.log('텍스트 입력 발생');
        console.log('입력값:', data.content);
        useTextStore
          .getState()
          .updateText({ id: data.text_id, content: data.content });
      } else if (data.type === 'nickname_input') {
        console.log('닉네임 입력 발생');
        console.log('입력값:', data.nickname);
        useTextStore
          .getState()
          .updateText({ id: data.text_id, nickname: data.nickname });
      } else if (data.type === 'save_text') {
        console.log('save_text');
        useTextStore.getState().updateText({
          id: data.text_id,
          content: data.content,
          nickname: data.nickname,
          showOnly: true,
          ...data.position,
        });
        console.log('텍스트 저장', data.content, data.nickname);
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
          <NavigateBar locate={'diary'} />
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
            diaryMonth={selectedDateInfo.selectedMonth}
            diaryDay={selectedDateInfo.selectedDay}
            diaryId={diary_id}
          />
        </WrapperInnerImg>
        <WrapperRightSticker>
          <RightSticker
            diaryMonth={selectedDateInfo.selectedMonth}
            diaryDay={selectedDateInfo.selectedDay}
            onDalleSelect={handleDalleSelect}
            websocket={websocket}
          />
        </WrapperRightSticker>
        <WrapperDHomeButton>
          <DHomeButton />
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
        <TextButton onClick={handleTextButtonClick} websocket={websocket} />
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
  top: -0.6rem;
`;
const WrapperLargeSketchbook = styled.div`
  position: absolute;
  top: 6.9375rem;
`;
const WrapperBasicSticker = styled.div`
  position: absolute;
  top: 13.5rem;
  left: 3.55rem;
`;
const WrapperRightSticker = styled.div`
  position: absolute;
  top: 16.87rem;
  margin-left: 86.2rem;
  margin-top: -3.4rem;
`;

const WrapperDHomeButton = styled.div`
  position: absolute;
  right: 2.0rem;
  top: 56.6rem;
  display: flex;
  z-index: 10;
`;

const WrapperSaveButton = styled.div`
  position: absolute;
  right: 6.4rem;
  top: 56.8rem;
  display: flex;
  z-index: 10;
`;

const WrapperInnerImg = styled.div`
  position: absolute;
  margin-top: -4rem;
  left: 22.7rem;
`;

export default DiaryPage;
