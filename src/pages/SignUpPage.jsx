import React, { useState, useEffect } from 'react';
import { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpBtn from '../components/SignIn_Up';
import SmallSketchbook from '../components/SmallSketchbook';
import sketbook from '../assets/img/HaruConnectingBook.png';
import LoginInput from '../components/LoginInput';
import axios from 'axios';

function SignUpPage(props) {
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');

  // 오류 메시지 상태, 오류 메시지 글씨 색 상태 저장
  const [usernameComment, setUsernameComment] = useState('');
  const [usernameCommentColor, setUsernameCommentColor] = useState('#DD0000');
  const [idComment, setIdComment] = useState(' - 영문을 포함해 4자리 이상');
  const [idCommentColor, setIdCommentColor] = useState('#777777');
  const [pwComment, setPwComment] = useState(
    '- 안전한 일기 보관을 위해 8~16 자의 영문, 숫자, 특수문자를 사용하세요.',
  );
  const [pwCommentColor, setPwCommentColor] = useState('#777777');
  const [pwMatchComment, setPwMatchComment] = useState('');
  const [pwMatchCommentColor, setPwMatchCommentColor] = useState('#777777');

  //흔들리는 애니메이션
  const [usernameShake, setUsernameShake] = useState(false);
  const [idShake, setIdShake] = useState(false);
  const [pwShake, setPwShake] = useState(false);
  const [pwMatchShake, setPwMatchShake] = useState(false);

  //유효성 검사
  const [usernameWrite, setUsernameWrite] = useState(false);
  const [idWrite, setIdWrite] = useState(false);
  const [pwWrite, setPwWrite] = useState(false);
  const [pwMatchWrite, setPwMatchWrite] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const inputUsername = e.target.value;
    setUsername(inputUsername);

    if (inputUsername !== '') {
      setUsernameWrite(true);
    } else {
      setUsernameWrite(false);
    }
    setUsernameComment('');
  };

  const handleIdChange = (e) => {
    const inputId = e.target.value;
    setId(inputId);

    const validCharacters = /^[a-zA-Z0-9]+$/;

    if (
      inputId.length < 4 ||
      !/[a-zA-Z]/.test(inputId) ||
      !validCharacters.test(inputId)
    ) {
      setIdComment(
        ' - 아이디는 4글자 이상이며 영문과 숫자로만 이루어져야 합니다.',
      );
      setIdCommentColor('#DD0000');
      setIdWrite(false);
    } else {
      setIdComment(' - 사용 가능한 아이디입니다.');
      setIdCommentColor('#00A656');
      setIdWrite(true);
    }
  };

  const handlePasswordChange = (e) => {
    const inputPw = e.target.value;
    const hasValidLength = inputPw.length >= 8 && inputPw.length <= 16;
    const hasLetter = /[a-zA-Z]/.test(inputPw);
    const hasNumber = /\d/.test(inputPw);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      inputPw,
    );
    setPassword(e.target.value);

    if (hasValidLength && hasLetter && hasNumber && hasSpecialChar) {
      setPwComment(' - 사용 가능한 비밀번호입니다.');
      setPwCommentColor('#00A656');
      setPwWrite(true);
      setPasswordCheck(inputPw);
    } else {
      setPwComment(
        ' - 비밀번호는 8~16자여야 하며, 영문자, 숫자, 특수문자를 반드시 포함해야 합니다.',
      );
      setPwCommentColor('#DD0000');
      setPwWrite(false);
      setPasswordCheck(inputPw);
    }
  };

  const handlePasswordMatchChange = (e) => {
    const inputPwMatch = e.target.value;
    setPasswordMatch(e.target.value);
    if (!pwWrite) {
      setPwMatchComment(' - 초기 비밀번호의 조건을 먼저 맞춰주세요!');
      setPwMatchCommentColor('#DD0000');
    } else {
      if (passwordCheck == inputPwMatch && inputPwMatch !== '') {
        setPwMatchComment(' - 비밀번호가 일치합니다.');
        setPwMatchCommentColor('#00A656');
        setPwMatchWrite(true);
      } else {
        setPwMatchComment(' - 비밀번호가 틀립니다.');
        setPwMatchCommentColor('#DD0000');
        setPwMatchWrite(false);
      }
    }
  };

  //api
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/members/signup/',
        {
          login_id: id,
          nickname: username,
          password: password,
        },
      );

      if (response.data.code === 'M001' && response.status === 201) {
        console.log('회원가입 완료');
        navigate('/login');
      } else {
        console.error('회원가입 실패:', response.data.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const resetShakeStates = () => {
      if (usernameShake) {
        setUsernameShake(false); // 초기화
      }
      if (idShake) {
        setIdShake(false); // 초기화
      }
      if (pwShake) {
        setPwShake(false); // 초기화
      }
      if (pwMatchShake) {
        setPwMatchShake(false); // 초기화
      }
    };

    const delay = 500; // 0.5초 딜레이

    const timeoutId = setTimeout(resetShakeStates, delay);

    return () => clearTimeout(timeoutId); // cleanup 함수
  }, [usernameShake, idShake, pwShake, pwMatchShake]);

  const InputError = () => {
    if (!usernameWrite) {
      setUsernameComment(' - 닉네임을 입력하세요');
      setUsernameShake(true);
    }
    if (!idWrite) {
      setIdComment(' - 아이디를 조건에 맞게 입력하세요');
      setIdCommentColor('#DD0000');
      setIdShake(true);
    }
    if (!pwWrite) {
      setPwComment(' - 비밀번호를 조건에 맞게 입력하세요');
      setPwCommentColor('#DD0000');
      setPwShake(true);
    }
    if (!pwMatchWrite) {
      setPwMatchComment(' - 비밀번호를 다시 확인해 주세요');
      setPwMatchCommentColor('#DD0000');
      setPwMatchShake(true);
    }
  };

  return (
    <BackLayout>
      <PageFrame>
        <SketDiv>
          <SignUpText>
            나만의 일기장을 <br />
            만들어 볼까요?
            <br />
          </SignUpText>

          <SmallSketchbook />

          <UsernameInput>
            <LoginInput
              type="text"
              placeholder="닉네임"
              text={username}
              handleTextChange={handleUsernameChange}
            />
          </UsernameInput>

          <UsernameRequireText
            usernameCommentColor={usernameCommentColor}
            shake={usernameShake}>
            {usernameComment}
          </UsernameRequireText>

          <IdInput>
            <LoginInput
              type="text"
              placeholder="아이디"
              text={id}
              handleTextChange={handleIdChange}
            />
          </IdInput>

          <IdRequireText idCommentColor={idCommentColor} shake={idShake}>
            {idComment}
          </IdRequireText>

          <PwInput>
            <LoginInput
              type="password"
              placeholder="비밀번호"
              text={password}
              handleTextChange={handlePasswordChange}
            />
          </PwInput>

          <PwRequireText pwCommentColor={pwCommentColor} shake={pwShake}>
            {pwComment}
          </PwRequireText>

          <PwMatchInput>
            <LoginInput
              type="password"
              placeholder="비밀번호 확인"
              text={passwordMatch}
              handleTextChange={handlePasswordMatchChange}
            />
          </PwMatchInput>

          <PwMatchRequireText
            pwMatchCommentColor={pwMatchCommentColor}
            shake={pwMatchShake}>
            {pwMatchComment}
          </PwMatchRequireText>

          <SignUpWrapper>
            <SignUpBtn
              text="회원 가입"
              onClick={() => {
                if (usernameWrite && idWrite && pwWrite && pwMatchWrite) {
                  handleSignUp();
                } else {
                  InputError();
                }
              }}
            />
          </SignUpWrapper>
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

const SignUpText = styled.div`
  left: 20%;
  color: #3cb5fa;
  font-family: Arial Black;
  font-size: 3rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  position: absolute;
  z-index: 3;
  margin-top: 10%;
  line-height: 1.2;
`;

const SketBook = styled.img`
  position: absolute;
  width: 42.6875rem;
  height: 51.875rem;
  flex-shrink: 0;
  margin-left: 60%;
`;

const UsernameInput = styled.div`
  position: absolute;
  margin-top: 27%;
  z-index: 2;
`;

const UsernameRequireText = styled.p`
  left: 20%;
  position: absolute;
  margin-top: 36%;
  z-index: 2;
  color: ${({ usernameCommentColor }) => usernameCommentColor};
  animation: ${({ shake }) =>
    shake
      ? css`
          ${shakeAnimation} 0.4s ease-in-out forwards
        `
      : 'none'};
`;

const IdInput = styled.div`
  position: absolute;
  margin-top: 41%;
  z-index: 2;
  color: ${({ idCommentColor }) => idCommentColor};
`;

const IdRequireText = styled.p`
  left: 20%;
  position: absolute;
  margin-top: 50%;
  z-index: 2;
  color: ${({ idCommentColor }) => idCommentColor};
  animation: ${({ shake }) =>
    shake
      ? css`
          ${shakeAnimation} 0.4s ease-in-out forwards
        `
      : 'none'};
`;

const PwInput = styled.div`
  position: absolute;
  margin-top: 55%;
  z-index: 2;
`;

const PwRequireText = styled.p`
  left: 20%;
  position: absolute;
  margin-top: 64%;
  z-index: 2;
  color: ${({ pwCommentColor }) => pwCommentColor};
  animation: ${({ shake }) =>
    shake
      ? css`
          ${shakeAnimation} 0.4s ease-in-out forwards
        `
      : 'none'};
`;

const PwMatchInput = styled.div`
  position: absolute;
  margin-top: 69%;
  z-index: 2;
`;

const PwMatchRequireText = styled.p`
  left: 20%;
  position: absolute;
  margin-top: 78%;
  z-index: 2;
  color: ${({ pwMatchCommentColor }) => pwMatchCommentColor};
  animation: ${({ shake }) =>
    shake
      ? css`
          ${shakeAnimation} 0.4s ease-in-out forwards
        `
      : 'none'};
`;

const SignUpWrapper = styled.div`
  position: absolute;
  margin-top: 82%;
  z-index: 2;
`;

export default SignUpPage;
