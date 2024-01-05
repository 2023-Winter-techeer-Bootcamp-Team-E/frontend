// 게스트 모달 컴포넌트
import { useState } from 'react';
import styled from 'styled-components';
import CheckButton from './CheckButton';
import GuestPwInput from './GuestPwInput';
import Cloud2 from '../../assets/img/Cloud2.png';
import Logo_Shadow from '../../assets/img/Logo_Shadow.png';

function GuestModal({ closeModal }) {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    setIsPasswordValid(newPassword.length === 4 && /^\d+$/.test(newPassword));
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <PwMessage>비밀번호 4자리를 설정해주세요!</PwMessage>
        <GuestPwInput
          type="password"
          placeholder="비밀번호"
          text={password}
          handleTextChange={handlePasswordChange}
        />
        <StyledCloud2 src={Cloud2} alt="Cloud 2" />
        <StyledLogo_Shadow src={Logo_Shadow} alt="Logo_Shadow" />
        <CheckButton
          closeModal={closeModal}
          isPasswordValid={isPasswordValid}
        />
      </ModalContent>
    </ModalWrapper>
  );
}

// 모달 배경
const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  /* display: ${(props) => (props.show ? 'block' : 'none')}; */
  backdrop-filter: blur(3px); // 뒷 배경 블러 처리
`;
// 모달 창
const ModalContent = styled.div`
  background-color: #f8f8f8;
  width: 49.0625rem;
  height: 44.37006rem;
  flex-shrink: 0;
  border-radius: 1.4375rem;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

//비밀번호 설정해주세요 텍스트
const PwMessage = styled.div`
  color: #2c2c2c;
  font-family: 'bmjua';
  font-size: 1.625rem;
  // font-style: normal;
  // font-weight: 400;
  // line-height: normal;
  position: absolute;
  top: 9.8rem;
  left: 8.15rem;
`;

//구름 이미지
const StyledCloud2 = styled.img`
  position: absolute;
  width: 10.5625rem;
  height: 8.4375rem;
  z-index: 3;
  top: 7.43rem;
  left: 30.62rem;
`;

// 로고 이미지
const StyledLogo_Shadow = styled.img`
  position: absolute;
  width: 24.1875rem;
  height: 19.3rem;
  flex-shrink: 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: 10;
  top: 21.44rem;
  left: 12.06rem;
`;
export default GuestModal;
