import React, { useState } from 'react';
import { keyframes, css } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignInBtn from '../components/SignIn_Up';
import SmallSketchbook from '../components/SmallSketchbook';
import sketbook from '../assets/img/HaruConnectingBook.png';
import LoginInput from '../components/LoginInput';

function LoginPage(props) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPwAlert, setWrongPwAlert] = useState('');
  const [wrongPwAlertColor, setWrongPwAlertColor] = useState('#DD0000');
  const [shake, setShake] = useState(false);

  //로그인 기능 사용 해 보려고 내꺼 임시로 만들어봄 ㅎ.ㅎ
  const jinooId = 'gkfn';
  const jinooPw = 'gkfn';

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    // 입력된 아이디와 비밀번호가 맞는지 확인
    if (id === jinooId && password === jinooPw) {
      navigate('/calendar');
      setWrongPwAlert('로그인 중...');
      setWrongPwAlertColor('#00A656');
    } else {
      setWrongPwAlert('아이디 또는 비밀번호가 일치하지 않습니다.');
      setShake(true); // 흔들리는 애니메이션 활성화
      setTimeout(() => {
        setShake(false); // 0.4초 후에 애니메이션 비활성화
      }, 400);
    }
  };

  return (
    <BackLayout>
      <PageFrame>
        <SketDiv>
          <SignInText>Login</SignInText>

          <SmallSketchbook />
          <IdInput>
            {
              <LoginInput
                type="text"
                placeholder="아이디"
                text={id}
                handleTextChange={handleIdChange}
              />
            }
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
}

const BackLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: #c1e3ff;
`;

const PageFrame = styled.div`
  /* background : #AAA; */
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
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  position: absolute;
  margin-top: 75%;
  z-index: 2;
  cursor: pointer;
  text-decoration: none;
`;

export default LoginPage;
