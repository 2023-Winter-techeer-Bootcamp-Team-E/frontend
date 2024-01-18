import React, { useState } from 'react';
import ResizableRect from 'react-resizable-rotatable-draggable';
// import cloud from '../assets/img/cloud.png';
import styled from 'styled-components';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const ImgSaveClick = () => {
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

function Stickers({ onDelete, image, bounds, initialPosition }) {
  const [position, setPosition] = useState({
    width2: 100,
    height2: 100,
    top: initialPosition.y,
    left: initialPosition.x,
    rotate2: 0,
    initialPosition,
  });

  // eslint-disable-next-line no-unused-vars
  const handleResize = (style, isShiftKey, type) => {
    let { top, left, width, height } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    setPosition((prevState) => ({
      ...prevState,
      width2: width,
      top2: top,
      height2: height,
      left2: left,
    }));
  };
  const handleRotate = (rotateAngle2) => {
    setPosition((prevState) => ({
      ...prevState,
      rotate2: rotateAngle2,
    }));
  };

  const handleDrag = (deltaX, deltaY) => {
    setPosition((prevState) => ({
      ...prevState,
      top2: position.top + deltaY,
      left2: position.left + deltaX,
    }));
  };

  return (
    <>
      <div
        style={{
          left: position.left,
          top: position.top,
          position: 'absolute',
          zIndex: 1,
        }}>
        <CloseButton
          onClick={onDelete}
          style={{
            left: position.left + position.width2 - 20,
            top: position.top - 10,
            zIndex: 200,
          }}
        />
        <ImgSaveBtn
          onClick={ImgSaveClick}
          style={{
            left: position.left + position.width2 - 35,
            top: position.top + position.height2 + 10,
          }}>
          저장
        </ImgSaveBtn>
        <img
          src={image}
          style={{
            zIndex: 100,
            width: position.width2,
            height: position.height2,
            left: position.left + 1,
            top: position.top + 1,
            rotate: `${position.rotate2}deg`,
            position: 'absolute',
          }}
          alt="Selected Sticker"
        />
        <ResizableRect
          bounds={bounds.current}
          left={position.left}
          top={position.top}
          width={position.width2}
          height={position.height2}
          rotateAngle={position.rotate2}
          // minWidth={100} // 최소크기
          // aspectRatio={false}
          // minHeight={100}
          zoomable="n, w, s, e, nw, ne, se, sw"
          // rotatable={true}
          // onRotateStart={this.handleRotateStart}
          onRotate={handleRotate}
          // onRotateEnd={this.handleRotateEnd}
          // onResizeStart={this.handleResizeStart}
          onResize={handleResize}
          // onResizeEnd={this.handleUp}
          // onDragStart={this.handleDragStart}
          onDrag={handleDrag}
          // onDragEnd={this.handleDragEnd}
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
