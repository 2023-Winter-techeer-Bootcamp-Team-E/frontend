import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useSelectDateInfoStore } from '../../stores/useSelectDateInfoStore';
import { useDiaryContent } from '../../stores/useDiaryContent';
import useTextStore from '../../stores/textStore';

function TextBox({ username, textId, bounds, websocket }) {
  const texts = useTextStore((state) => state.texts);
  const text = texts.find((t) => t.id === textId);
  const [isComposing, setIsComposing] = useState(false);
  const selectedDateInfo = useSelectDateInfoStore((state) => state);
  const placeholder = `${username}님과 ${selectedDateInfo.selectedMonth}월 ${selectedDateInfo.selectedDay}일의 일상을 공유해봐요!`;
  //----------------------------------------------------------------------
  const TextSaveClick = ({}) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: '저장하실 건가요?',
        text: '한번 저장하면 내용을 수정할 수 없어요!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네, 저장할게요!',
        cancelButtonText: '아니요, 나중에 할게요!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const userText = document.querySelector('#textInput').value; // TextInput의 id를 지정해야 함
          useDiaryContent.setState({ diaryContent: userText });
          console.log('저장된 content:', userText);

          websocket.current.send(
            JSON.stringify({
              type: 'save_text',
              id: textId,
              content: text.content,
              nickname: text.nickname,
              position: {
                x: text.x,
                y: text.y,
                width: text.width,
                height: text.height,
              },
            }),
          );
          swalWithBootstrapButtons.fire({
            title: '저장되었어요!',
            icon: 'success',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: '저장되지 않았어요',
            icon: 'error',
          });
        }
      });
  };
  //----------------------------------------------------------------------
  if (text.showOnly) {
    return (
      <div
        style={{
          position: 'absolute',
          color: '#000',
          left: text.x + 'px',
          top: text.y + 'px',
        }}>
        <p style={{ fontFamily: 'dachelove', fontSize: '1.7rem' }}>
          {text.content}
        </p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ fontFamily: 'dachelove', margin: '0.5rem' }}>-</p>
          <span style={{ fontFamily: 'dachelove', fontSize: '1.7rem' }}>
            {text.nickname}
          </span>
          <p style={{ fontFamily: 'dachelove', margin: '0.5rem' }}>-</p>
        </div>
      </div>
    );
  }

  // WebSocket 메시지 전송 함수
  const sendWebSocketMessage = (
    type,
    updatedPosition,
    content = null,
    nickname = null,
  ) => {
    const message = {
      type,
      id: textId,
      position: updatedPosition,
    };

    if (content !== null) {
      message.content = content;
    }

    if (nickname !== null) {
      message.nickname = nickname;
    }

    websocket.current.send(JSON.stringify(message));
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e) => {
    setIsComposing(false);
    sendWebSocketMessage('text_input', null, e.target.value);
  };

  const handleDrag = (e, d) => {
    sendWebSocketMessage('text_drag', { x: d.x, y: d.y });
  };

  const handleResize = (e, direction, ref, delta, position) => {
    sendWebSocketMessage('text_resize', {
      width: ref.style.width,
      height: ref.style.height,
    });
  };

  const handleDragStop = (e, d, nickname) => {
    object_type = 'text';
    const textData = {
      content: e.target.value,
      nickname: nickname,
      x: text.x,
      y: text.y,
      width: text.width,
      height: text.height,
    };
    useTextStore.getState().updateText(textData);
    sendWebSocketMessage('drag_stop', object_type, textData);
  };

  const handleResizeStop = (e, direction, ref, delta, nickname) => {
    object_type = 'text';
    const textData = {
      content: e.target.value,
      nickname: nickname,
      x: text.x,
      y: text.y,
      width: text.width,
      height: text.height,
    };
    useTextStore.getState().updateText(textData);
    sendWebSocketMessage('resize_stop', object_type, textData);
  };

  const onDelete = () => {
    // 서버로 삭제 요청 보내기
    websocket.current.send(
      JSON.stringify({
        type: 'delete_object',
        object_type: 'text',
        object_id: textId,
      }),
    );
  };

  const handleTextChange = (e) => {
    const content = e.target.value;
    // useTextStore.getState().updateText({
    //   id: textId,
    //   content: updatedText,
    // });
    console.log(typeof content);
    sendWebSocketMessage('text_input', null, content);
  };

  const handleNicknameChange = (e) => {
    const nickname = e.target.value;
    // useTextStore.getState().updateText({
    //   id: textId,
    //   nickname,
    // });
    sendWebSocketMessage('nickname_input', null, null, nickname);
  };

  return (
    <>
      <Rnd
        size={{ width: text.width, height: text.height }}
        position={{ x: text.x, y: text.y }}
        onDrag={handleDrag}
        onResize={handleResize}
        // onDragStop={handleDragStop}
        // onResizeStop={handleResizeStop}
        enableResizing={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
        bounds={bounds.current}>
        <CloseButton onClick={onDelete} />
        <ContainerDiv>
          <TextInput
            value={text.content}
            onChange={handleTextChange}
            id="textInput"
            placeholder={placeholder}
            style={{ width: '100%' }}
          />

          <BtnWrap style={{ width: '100%' }}>
            {' '}
            <NicknameInput
              value={text.nickname}
              placeholder="닉네임을 입력하세요"
              style={{ width: '70%' }}
              onChange={handleNicknameChange}
            />
            <TextSaveBtn onClick={TextSaveClick}>입력</TextSaveBtn>
          </BtnWrap>
        </ContainerDiv>
      </Rnd>
    </>
  );
}

export default TextBox;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px dotted #000;
  box-sizing: border-box;
  padding: 10px;
  height: 100%; // 전체 높이를 100%로 설정
`;

const CloseButton = styled.span`
  background-color: #f26c60;
  color: white;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  position: absolute;
  z-index: 1000;
  top: -10px;
  right: -10px;

  &:after {
    content: '\\00d7'; // X 문자
    color: white; // 글자색 지정
    display: inline-block;
    font-size: 15pt;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  }
`;

const TextInput = styled.input`
  flex-grow: 1; // flex-grow 속성으로 높이 조절
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  font-family: 'dachelove';
  color: #000;
  font-size: 2.3rem;
  width: 100%; // 너비는 100%로 유지
  resize: none;
  border: none;
  overflow: auto; // 내용이 넘칠 경우 스크롤바 표시
  background: transparent;
`;

const TextSaveBtn = styled.div`
  width: 3.25rem;
  height: 1.6875rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: #d6b6ff;
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
  //font-family: Noto Sans;
  font-family: 'bmjua';
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .btn-no-outline {
    outline: none !important;
  }
`;

const NicknameInput = styled.input`
  width: 11.5rem; // 너비 조정
  height: 1.8rem; // 높이 조정
  padding-left: 1rem; // 내부 여백 추가
  margin-right: 10px; // 텍스트 저장 버튼과의 간격 조정
  color: #aaa;
  // font-family: Inter;
  font-family: 'bmjua';
  background-color: #fff;
  font-size: 1.2rem;
  border: 1px solid #aaa; // 테두리 추가
  border-radius: 0.3125rem; // 모서리 둥글게
  outline: none;

  &::placeholder {
    color: #aaaaaa;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
