import React, { useState } from 'react';
import { styled } from 'styled-components';
import InnerImg1 from '../../../assets/img/InnerImg1.png';
import InnerImg2 from '../../../assets/img/InnerImg2.png';
import InnerImg3 from '../../../assets/img/InnerImg3.png';
import InnerImg4 from '../../../assets/img/InnerImg4.png';
import InnerImg5 from '../../../assets/img/InnerImg5.png';
import InnerImg6 from '../../../assets/img/InnerImg6.png';
import SelectImgBtn from '../../../assets/img/SelectImgBtn.png';
import MaskingTape1 from '../../../assets/img/MaskingTape1.png';
import MaskingTape2 from '../../../assets/img/MaskingTape2.png';

function SelectInnerPaper(props) {
  const [pageNum, setPageNum] = useState(1);

  const PageNumSub = () => {
    if (pageNum > 1) {
      setPageNum((PageNum) => PageNum - 1); // 이전 상태를 가져와서 변경
    }
  };

  const PageNumAdd = () => {
    if (pageNum < 6) {
      setPageNum((prevPageNum) => prevPageNum + 1); // 이전 상태를 가져와서 변경
    }
  };

  const handleCheckBtnClick = () => {
    onPageChange(3);
  };

  const RotateImg = (pageNum) => {
    switch (
      pageNum // 이미지는 임시로 가져온거고 나중에 DB에서 가져와서 쓸 예정
    ) {
      case 1:
        return <InnerImg src={InnerImg1} />;
      case 2:
        return <InnerImg src={InnerImg2} />;
      case 3:
        return <InnerImg src={InnerImg3} />;
      case 4:
        return <InnerImg src={InnerImg4} />;
      case 5:
        return <InnerImg src={InnerImg5} />;
      case 6:
        return <InnerImg src={InnerImg6} />;
      default:
        return null;
    }
  };

  return (
    <PageFrame>
      <SelectDateText>12월 31일 일기를 작성해요!</SelectDateText>
      <SelectInnerPaperText>일기 배경지를 선택해 주세요</SelectInnerPaperText>

      <TopMaskingTape src={MaskingTape1} />
      {RotateImg(pageNum)}
      <BottomMaskingTape src={MaskingTape2} />

      <SelectImgLeftBtn src={SelectImgBtn} onClick={PageNumSub} />
      <SelectImgRightBtn src={SelectImgBtn} onClick={PageNumAdd} />

      <CheckBtn onClick={handleCheckBtnClick}>확인</CheckBtn>
    </PageFrame>
  );
}
const PageFrame = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
  display: flex;
  justify-content: center;

  z-index: 15;

  color: #000;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: Bold;
  font-weight: 900;
  line-height: normal;
`;

const SelectDateText = styled.p`
  position: absolute;
  margin-top: 4.69rem;
  color: #2c199f;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  left: 1.19rem;
`;

const SelectInnerPaperText = styled.p`
  position: absolute;
  margin-top: 8.75rem;
  color: #9f9f9f;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  left: 1.19rem;
`;

const InnerImg = styled.img`
  position: absolute;
  width: 12.3125rem;
  height: 18.9375rem;
  flex-shrink: 0;
  margin-top: 11.12rem;
  z-index: 2;
`;

const TopMaskingTape = styled.img`
  position: absolute;
  width: 3.75rem;
  height: 1.04506rem;
  transform: rotate(-30deg);
  flex-shrink: 0;
  margin-top: 11rem;
  margin-left: -10rem;
  z-index: 3;
`;

const BottomMaskingTape = styled.img`
  position: absolute;
  width: 3.75rem;
  height: 1.04506rem;
  transform: rotate(-30deg);
  flex-shrink: 0;
  margin-top: 29rem;
  margin-right: -10rem;
  z-index: 3;
`;

const SelectImgLeftBtn = styled.img`
  position: absolute;
  flex-shrink: 0;
  height: 2.09863rem;
  width: 1.59675rem;
  margin-top: 31.06rem;
  margin-left: -4rem;
  z-index: 2;
  cursor: pointer;
`;

const SelectImgRightBtn = styled.img`
  position: absolute;
  flex-shrink: 0;
  height: 2.09863rem;
  width: 1.59675rem;
  flex-shrink: 0;
  margin-top: 31.06rem;
  margin-right: -4rem;
  z-index: 2;
  transform: rotate(-180deg);
  cursor: pointer;
`;

const CheckBtn = styled.div`
  position: absolute;
  margin-top: 34.81rem;
  width: 5.375rem;
  height: 2.38881rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #c1c3ff;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;
export default SelectInnerPaper;
