import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const TextSaveClick = () => {
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

function TextSave() {
  return (
    <TextSaveContainer onClick={TextSaveClick}>
      입력
    </TextSaveContainer>
  );
}

const TextSaveContainer = styled.div`
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
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .btn-no-outline {
    outline: none !important;
  }
`;

export default TextSave;
