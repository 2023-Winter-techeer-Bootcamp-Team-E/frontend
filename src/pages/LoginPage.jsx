//LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { keyframes, css } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useUserInfoStore from '../stores/userInfoStore';
import styled from 'styled-components';
import Swal from 'sweetalert2';
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
  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInUserNickname = localStorage.getItem('loggedInUserNickname');

    if (loggedInUserId && loggedInUserNickname) {
      // 기존 정보를 제거하고 새로운 정보를 추가
      userInfoStore.removeUserInfo(loggedInUserId);
      userInfoStore.addUserInfo(loggedInUserId, loggedInUserNickname);
    }

    // 화면이 처음 마운트될 때는 SweetAlert 창을 띄우지 않도록 추가
    if (userInfoStore.userInfoList.length === 0 && showLoginAlert) {
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다!',
        text: '로그인을 하고 일기를 작성해 주세요! 😜',
        confirmButtonText: '확인',
        allowOutsideClick: false,
      }).then(() => {
        navigate('/login');
      });
    }
  }, [userInfoStore.userInfoList.length, navigate, showLoginAlert]);
  useEffect(() => {
    setShowLoginAlert(true);
  }, []);

  // 로그인 상태인 경우 /calendar 페이지로 자동 리다이렉트
  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInUserNickname = localStorage.getItem('loggedInUserNickname');

    if (loggedInUserId && loggedInUserNickname) {
      // 기존 정보를 제거하고 새로운 정보를 추가
      userInfoStore.removeUserInfo(loggedInUserId);
      userInfoStore.addUserInfo(loggedInUserId, loggedInUserNickname);
    }
  }, [userInfoStore.addUserInfo]);

  if (userInfoStore.userInfoList.length > 0) {
    navigate('/calendar');
  }

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
        // 기존 상태를 삭제하고 새로운 상태를 저장
        localStorage.removeItem('loggedInUserId');
        userInfoStore.removeUserInfo(localStorage.getItem('loggedInUserId'));

        const { nickname } = response.data; // API 응답에서 nickname 추출
        Swal.fire({
          icon: 'success',
          title: `환영합니다. ${nickname}님!`,
          confirmButtonText: '확인',
        });
        localStorage.setItem('loggedInUserId', id);
        localStorage.setItem('loggedInUserNickname', nickname);
        userInfoStore.addUserInfo(id, nickname); // nickname으로 업데이트
        navigate('/calendar');
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
              font={'bmjua'}
              handleTextChange={handleIdChange}
            />
          </IdInput>
          <PwInput>
            <LoginInput
              type="text"
              placeholder="비밀번호"
              text={password}
              font={password ? '' : 'bmjua'}
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
          {/* <Line /> */}
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
  font-family: crown;
  font-size: 8rem;
  position: absolute;
  z-index: 3;
  margin-top: 13rem;
`;

const SketBook = styled.img`
  position: absolute;
  width: 44.6875rem;
  height: 51.875rem;
  flex-shrink: 0;
  margin-left: 63rem;
`;

const IdInput = styled.div`
  position: absolute;
  margin-top: 38%;
  margin-left: 3rem;
  z-index: 2;
`;

const PwInput = styled.div`
  position: absolute;
  margin-top: 48%;
  z-index: 2;
  margin-left: 3rem;
  color: #000;
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

const SignUpText = styled(Link)`
  color: #c4c4c4;
  font-size: 1.25rem;
  font-weight: 900;
  margin-top: 74%;
  z-index: 2;
`;

export default LoginPage;
