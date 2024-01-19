import React, { useState } from 'react';
import { keyframes, css } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useUserInfoStore from '../store/UserInfoStore';
import styled from 'styled-components';
import SignInBtn from '../components/SignIn_Up';
import SmallSketchbook from '../components/SmallSketchbook';
import sketbook from '../assets/img/HaruConnectingBook.png';
import LoginInput from '../components/LoginInput';
import axios from 'axios';
import { baseInstance } from '../api/config';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPwAlert, setWrongPwAlert] = useState('');
  const [wrongPwAlertColor, setWrongPwAlertColor] = useState('#DD0000');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleIdChange = (e) => setId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const response = await baseInstance.post('/members/login/', {
        login_id: id,
        password,
      });
      if (response.data.code === 'A001' && response.status === 200) {
        console.log('로그인 성공');
        navigate('/calendar');

        // 유저 정보를 Zustand 스토어에 추가
        useUserInfoStore((state) =>
          state.addUserInfo(
            response.data.userId,
            response.data.nickname,
            password,
          ),
        );
        console.log('Zustand 스토어에 추가된 유저 정보:', state.userInfoList);
        setWrongPwAlert('로그인 중...');
        setWrongPwAlertColor('#00A656');
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('로그인 실패 : ', error.response.message);
        setWrongPwAlert('아이디 또는 비밀번호가 일치하지 않습니다.');
        setShake(true);
        setTimeout(() => setShake(false), 400);
      } else {
        console.error('API 호출 중 오류 발생 : ', error);
      }
    }
  };

  const handleKeyDown = (e) => e.key === 'Enter' && handleLogin();

  return (
    <BackLayout>
      <PageFrame onKeyDown={handleKeyDown}>
        <SketDiv>
          <SignInText>Login</SignInText>
          <SmallSketchbook />
          <IdInput>
            <LoginInput
              type="text"
              placeholder="아이디"
              text={id}
              handleTextChange={handleIdChange}
            />
          </IdInput>
          <PwInput>
            <LoginInput
              type="password"
              placeholder="비밀번호"
              text={password}
              handleTextChange={handlePasswordChange}
            />
          </PwInput>
          <WrongPasswordAlert
            wrongPwAlertColor={wrongPwAlertColor}
            shake={shake}>
            {wrongPwAlert}
          </WrongPasswordAlert>
          <SignInInput>
            <SignInBtn text="일기장 펼치기" onClick={handleLogin} />
          </SignInInput>
          <Line />
          <SignUpText to="/signup">회원 가입</SignUpText>
        </SketDiv>
        <SketBook src={sketbook} />
      </PageFrame>
    </BackLayout>
  );
};

const BackLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(to bottom, #c1e3ff 60%, #ffffff);
  overflow-y: hidden;
`;

const PageFrame = styled.div`
  position: absolute;
  width: 108rem;
  height: 70rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  place-items: center;
`;

const slideUp = keyframes`
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SketDiv = styled.div`
  position: absolute;
  width: 60.75rem;
  height: 59.8125rem;
  display: flex;
  justify-content: center;
  margin-top: 3%;
  margin-left: 2.314814815%;
  animation: ${slideUp} 1s ease-out;
`;

const SignInText = styled.div`
  color: #3cb5fa;
  font-family: Arial Black;
  font-size: 6rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  position: absolute;
  z-index: 3;
  margin-top: 10%;
`;

const SketBook = styled.img`
  position: absolute;
  width: 42.6875rem;
  height: 51.875rem;
  flex-shrink: 0;
  margin-left: 60%;
`;

const IdInput = styled.div`
  position: absolute;
  margin-top: 38%;
  z-index: 2;
`;

const PwInput = styled.div`
  position: absolute;
  margin-top: 48%;
  z-index: 2;
`;

const shakeAnimation = keyframes`
  0% {
    transform: translateX(-5px);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
`;

const WrongPasswordAlert = styled.div`
  left: 20%;
  position: absolute;
  margin-top: 58%;
  z-index: 2;
  font-size: 1rem;
  color: ${({ wrongPwAlertColor }) => wrongPwAlertColor};
  animation: ${({ shake }) =>
    shake
      ? css`
          ${shakeAnimation} 0.4s ease-in-out forwards
        `
      : 'none'};
`;

const SignInInput = styled.div`
  position: absolute;
  margin-top: 62%;
  z-index: 2;
`;

const Line = styled.hr`
  position: absolute;
  width: 46.93769rem;
  height: 0.0625rem;
  background: #e1e1e1;
  margin-top: 73%;
  z-index: 2;
`;

const SignUpText = styled(Link)`
  color: #c4c4c4;
  font-family: Arial;
  font-size: 1.25rem;
  font-weight: 900;
  margin-top: 75%;
  z-index: 2;
`;

export default LoginPage;
