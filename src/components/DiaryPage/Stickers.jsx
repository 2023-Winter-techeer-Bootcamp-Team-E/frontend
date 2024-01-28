import React, { useState, useEffect } from 'react';
import ResizableRect from 'react-resizable-rotatable-draggable';
import styled from 'styled-components';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useStickerStore from '../../stores/stickerStore';

const ImgSaveClick = ({ websocket, stickerId, image, postion }) => {
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
        websocket.current.send(
          JSON.stringify({
            type: 'save_sticker',
            id: stickerId,
            image: image,
            position: position,
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

function Stickers({ stickerId, image, bounds, websocket }) {
  const stickers = useStickerStore((state) => state.stickers);
  const sticker = stickers.find((s) => s.id === stickerId);

  // WebSocket 메시지 전송 함수
  const sendWebSocketMessage = (type, updatedPosition, objectType) => {
    console.log(
      `Sending message: Type: ${type}, stickerId: ${stickerId}, Position:`,
      updatedPosition,
    );
    websocket.current.send(
      JSON.stringify({
        type,
        id: stickerId,
        object_type: objectType,
        position: updatedPosition,
      }),
    );
  };

  // eslint-disable-next-line no-unused-vars
  const handleResize = (style, isShiftKey, type) => {
    const position = {
      width2: Math.round(style.width),
      height2: Math.round(style.height),
      top2: Math.round(style.top),
      left2: Math.round(style.left),
    };

    sendWebSocketMessage('image_resize', position);
  };

  const handleRotate = (rotateAngle) => {
    console.log('회전');
    const roundedRotate = Math.round(rotateAngle);
    sendWebSocketMessage('image_rotate', { rotate2: roundedRotate });
  };

  const handleDrag = (deltaX, deltaY) => {
    const boundsRect = bounds.current.getBoundingClientRect();

    // 범위를 확장합니다.
    const expandedBounds = {
      left: boundsRect.left - 386,
      top: boundsRect.top - 184,
      right: boundsRect.right - 385,
      bottom: boundsRect.bottom - 185,
    };

    let newTop = sticker.top2 + deltaY;
    let newLeft = sticker.left2 + deltaX;

    // 확장된 범위 내에서만 이동하도록 조정합니다.
    if (newLeft < expandedBounds.left) newLeft = expandedBounds.left;
    if (newTop < expandedBounds.top) newTop = expandedBounds.top;
    if (newLeft + sticker.width2 > expandedBounds.right) {
      newLeft = expandedBounds.right - sticker.width2;
    }
    if (newTop + sticker.height2 > expandedBounds.bottom) {
      newTop = expandedBounds.bottom - sticker.height2;
    }

    const roundedTop = Math.round(newTop);
    const roundedLeft = Math.round(newLeft);

    sendWebSocketMessage('image_drag', {
      top2: roundedTop,
      left2: roundedLeft,
    });
  };

  const handleDragStop = () => {
    object_type = 'sticker';
    const stickerData = {
      image: image,
      width2: sticker.width2,
      height2: sticker.height2,
      top2: sticker.top2,
      left2: sticker.left2,
      rotate2: sticker.rotate2,
    };
    useStickerStore.getState().updateSticker(stickerData);
    sendWebSocketMessage('drag_stop', object_type, stickerData);
  };

  const handleResizeStop = () => {
    object_type = 'sticker';
    const stickerData = {
      image: image,
      width2: sticker.width2,
      height2: sticker.height2,
      top2: sticker.top2,
      left2: sticker.left2,
      rotate2: sticker.rotate2,
    };
    useStickerStore.getState().updateSticker(stickerData);
    sendWebSocketMessage('resize_stop', object_type, stickerData);
  };

  const handleRotateStop = () => {
    object_type = 'sticker';
    const stickerData = {
      image: image,
      width2: sticker.width2,
      height2: sticker.height2,
      top2: sticker.top2,
      left2: sticker.left2,
      rotate2: sticker.rotate2,
    };
    useStickerStore.getState().updateSticker(stickerData);
    sendWebSocketMessage('rotate_stop', object_type, stickerData);
  };

  const onDelete = () => {
    // 서버로 삭제 요청 보내기
    websocket.current.send(
      JSON.stringify({
        type: 'delete_object',
        object_type: 'sticker',
        object_id: stickerId,
      }),
    );
  };

  return (
    <>
      <div
        style={{
          width: sticker.width2,
          height: sticker.height2,
          position: 'absolute',
          zIndex: 1,
        }}>
        <CloseButton
          onClick={onDelete}
          style={{
            left: sticker.left2 + sticker.width2 - 20,
            top: sticker.top2 - 10,
            zIndex: 200,
          }}
        />
        <ImgSaveBtn
          onClick={() =>
            ImgSaveClick({
              websocket: websocket,
              stickerId: sticker.id,
              image: image,
              position: {
                width2: sticker.width2,
                height2: sticker.height2,
                top2: sticker.top2 + 1,
                left2: sticker.left2 + 1,
                rotate2: `${sticker.rotate2}deg`,
              },
            })
          }
          style={{
            left: sticker.left2 + sticker.width2 - 35,
            top: sticker.top2 + sticker.height2 + 10,
          }}>
          저장
        </ImgSaveBtn>
        <img
          src={image}
          style={{
            width: sticker.width2,
            height: sticker.height2,
            left: sticker.left2 + 1,
            top: sticker.top2 + 1,
            rotate: `${sticker.rotate2}deg`,
            position: 'absolute',
          }}
          alt="Selected Sticker"
        />
        <ResizableRect
          style={{ zIndex: 1000 }}
          left={sticker.left2}
          top={sticker.top2}
          width={sticker.width2}
          height={sticker.height2}
          rotateAngle={sticker.rotate2}
          zoomable="n, w, s, e, nw, ne, se, sw"
          onRotate={handleRotate}
          onResize={handleResize}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          onRotateStop={handleRotateStop}
        />
      </div>
    </>
  );
}

export default Stickers;

const CloseButton = styled.span`
  background-color: #f26c60;
  color: white;
  width: 2rem;
  height: 2rem;
  font-size: small;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  position: absolute;
  top: -10px; // 위치 조정
  right: -10px;
  z-index: 100;

  &:after {
    content: '\\00d7';
    font-size: 15pt;
    display: inline-block;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  }
`;

const ImgSaveBtn = styled.div`
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
  top: -10px; // 위치 조정
  right: -30px;
  z-index: 100;
  position: absolute;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  }

  color: #000;
  /* font-family: Inter; */
  font-family: 'bmjua';

  font-size: 1rem;
  font-style: normal;
  font-weight: lighter;
  line-height: normal;

  .btn-no-outline {
    outline: none !important;
  }
`;
