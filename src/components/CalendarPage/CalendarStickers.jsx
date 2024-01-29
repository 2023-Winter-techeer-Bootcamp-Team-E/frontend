import React, { useState } from 'react';
import ResizableRect from 'react-resizable-rotatable-draggable';
import { baseInstance } from '../../api/config';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function Stickers({ onDelete, image, bounds, locate }) {
  const [position, setPosition] = useState({
    width2: 100,
    height2: 100,
    top2: 100,
    left2: 100,
    rotate2: 0,
  });

  // eslint-disable-next-line no-unused-vars

  const handleSaveCalendarSticker = async () => {
    const stickerData = {
      stickers_info: {
        sticker_image_url: image,
        top: position.top2,
        left: position.left2,
        width: position.width2,
        height: position.height2,
        rotate: position.rotate2,
      },
    };
    try {
      const response = await baseInstance.post(
        '/calendars/stickers',
        stickerData,
      );
      // Handle the response as needed
      console.log(response.data);

      if (response.status === 200) {
        const responseData = response.data;
        console.log('응답 데이터:', responseData);

        // 여기에서 responseData를 확인하여 필요한 정보를 추출할 수 있습니다.
      } else {
        console.error('스티커 추가 실패 : ', response.data);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      console.log('stickerData:', stickerData);
    }
  };

  const ImgSaveClick = (locate) => {
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
        if (result.isConfirmed && (locate == 'calendar' || locate == 'diary')) {
          swalWithBootstrapButtons.fire({
            title: '저장되었어요!',
            icon: 'success',
          });
          if (locate == 'calendar') {
            console.log('캘린더 저장');
            handleSaveCalendarSticker();
            console.log('캘린더 저장 끝');
          }
        } else {
          swalWithBootstrapButtons.fire({
            title: '저장되지 않았어요',
            icon: 'error',
          });
        }
        // else if (result.dismiss === Swal.DismissReason.cancel) {
        //   swalWithBootstrapButtons.fire({
        //     title: '저장되지 않았어요',
        //     icon: 'error',
        //   });
        // }
      });
  };

  const handleResize = (style, isShiftKey, type) => {
    setPosition((prevState) => {
      let { top, left, width, height } = style;
      top = Math.round(top);
      left = Math.round(left);
      width = Math.round(width);
      height = Math.round(height);
      return {
        ...prevState,
        width2: width,
        top2: top,
        height2: height,
        left2: left,
      };
    });
  };
  const handleRotate = (rotateAngle2) => {
    setPosition((prevState) => ({
      ...prevState,
      rotate2: rotateAngle2,
    }));
  };

  const handleDrag = (deltaX, deltaY) => {
    setPosition((prevState) => {
      const boundsRect = bounds.current.getBoundingClientRect();
      const expandedBounds = {
        // left: boundsRect.left - 386,
        // top: boundsRect.top - 184,
        // right: boundsRect.right - 385,
        // bottom: boundsRect.bottom - 185,
        // 대체 왜 안되는거야 ㅠ
      };
      let newTop = prevState.top2 + deltaY;
      let newLeft = prevState.left2 + deltaX;
      if (newLeft < expandedBounds.left) newLeft = expandedBounds.left;
      if (newTop < expandedBounds.top) newTop = expandedBounds.top;
      if (newLeft + prevState.width2 > expandedBounds.right) {
        newLeft = expandedBounds.right - prevState.width2;
      }
      if (newTop + prevState.height2 > expandedBounds.bottom) {
        newTop = expandedBounds.bottom - prevState.height2;
      }
      return {
        ...prevState,
        top2: newTop,
        left2: newLeft,
      };
    });
  };

  return (
    <>
      <div
        style={{
          width: position.width2,
          height: position.height2,
          position: 'absolute',
          zIndex: 1,
        }}>
        <CloseButton
          onClick={onDelete}
          style={{
            left: position.left2 + position.width2 - 20,
            top: position.top2 - 10,
            zIndex: 1,
          }}
        />
        <ImgSaveBtn
          onClick={() => ImgSaveClick(locate)}
          style={{
            left: position.left2 + position.width2 - 35,
            top: position.top2 + position.height2 + 10,
          }}>
          저장
        </ImgSaveBtn>
        <img
          src={image}
          style={{
            width: position.width2,
            height: position.height2,
            left: position.left2 + 1,
            top: position.top2 + 1,
            rotate: `${position.rotate2}deg`,
            position: 'absolute',
          }}
          alt="Selected Sticker"
        />
        <ResizableRect
          style={{ zIndex: 1000 }}
          left={position.left2}
          top={position.top2}
          width={position.width2}
          height={position.height2}
          rotateAngle={position.rotate2}
          zoomable="n, w, s, e, nw, ne, se, sw"
          onRotate={handleRotate}
          onResize={handleResize}
          onDrag={handleDrag}
          bounds="parent"
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
