import React from 'react';
import styled from 'styled-components';
import { baseInstance } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function SaveButton({ savedData }) {
  const navigate = useNavigate();

  // 최종저장
  const SaveAll = async () => {
    console.log('저장할 데이터:', savedData);
    try {
      const response = await baseInstance.put('/diaries/save', {
        saved_data: savedData,
      });
      if (response.status === 200) {
        console.log('일기 저장 성공');
      } else {
        console.log('일기장 저장 실패');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생 : ', error);
    }
  };

  const SaveClick = async () => {
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
        text: '일기 내용을 완전히 저장하실 건가요?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네, 저장할게요!',
        cancelButtonText: '아니요, 나중에 할게요!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await SaveAll();
          swalWithBootstrapButtons.fire({
            title: '일기가 저장되었어요!',
            icon: 'success',
          });
          navigate('/past');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: '일기가 저장되지 않았어요',
            icon: 'error',
          });
        }
      });
  };

  return (
    <SaveButtonContainer onClick={SaveClick}>저장하기</SaveButtonContainer>
  );
}

const SaveButtonContainer = styled.div`
  width: 12.375rem;
  height: 3.0125rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  background: #c1c3ff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  }

  color: #fff;
  text-align: center;
  // font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default SaveButton;
