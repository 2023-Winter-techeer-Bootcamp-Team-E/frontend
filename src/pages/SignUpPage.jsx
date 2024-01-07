import React, { useState } from 'react';
import { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpBtn from '../components/SignIn_Up';
import SmallSketchbook from '../components/SmallSketchbook';
import sketbook from '../assets/img/HaruConnectingBook.png';
import LoginInput from '../components/LoginInput';

function SignUpPage(props) {
  //닉네임, 아이디, 비밀번호, 비밀번호 확인
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');

  // 오류 메시지 상태, 오류 메시지 글씨 색 상태 저장
  const [idComment, setIdComment] = useState(' - 영문을 포함해 4자리 이상');
  const [idCommentColor, setIdCommentColor] = useState('#777777');
  const [pwComment, setPwComment] = useState(
    '- 안전한 일기 보관을 위해 8~16 자의 영문, 숫자, 특수문자를 사용하세요.',
  );
  const [pwCommentColor, setPwCommentColor] = useState('#777777');
  const [pwMatchComment, setPwMatchComment] = useState('');
  const [pwMatchCommentColor, setPwMatchCommentColor] = useState('#777777');

  //유효성 검사
  const [usernameWrite, setUsernameWrite] = useState(false);
  const [idWrite, setIdWrite] = useState(false);
  const [pwWrite, setPwWrite] = useState(false);
  const [pwMatchWrite, setPwMatchWrite] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const navigate = useNavigate();

  //닉네임 설정
  const handleUsernameChange = (e) => {
    const inputUsername = e.target.value;
    setUsername(inputUsername);

    if (inputUsername !== '') {
      setUsernameWrite(true);
    } else {
      setUsernameWrite(false);
    }
  };

  //아이디 설정
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
      setIdCommentColor('#DD0000'); // 빨간색 글씨로 변경
      setIdWrite(false);
    } else {
      setIdComment(' - 사용 가능한 아이디입니다.');
      setIdCommentColor('#00A656'); // 초록색 글씨로 변경
      setIdWrite(true);
    }
  };

  //비밀번호 설정
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
      setPwCommentColor('#00A656'); // 초록색 글씨로 변경
      setPwWrite(true);
      setPasswordCheck(inputPw);
    } else {
      setPwComment(
        ' - 비밀번호는 8~16자여야 하며, 영문자, 숫자, 특수문자를 반드시 포함해야 합니다.',
      );
      setPwCommentColor('#DD0000'); // 빨간색 글씨로 변경
      setPwWrite(false);
      setPasswordCheck(inputPw);
    }
  };

  //비밀번호 확인 설정
  const handlePasswordMatchChange = (e) => {
    const inputPwMatch = e.target.value;
    setPasswordMatch(e.target.value);
    if (!pwWrite) {
      //초기 비밀번호 조건을 맞추지 않았을 때
      setPwMatchComment(' - 초기 비밀번호의 조건을 먼저 맞춰주세요!');
      setPwMatchCommentColor('#DD0000'); // 빨간색 글씨로 변경
    } else {
      //초기 비밀번호 조건을 맞췄을 때
      if (passwordCheck == inputPwMatch && inputPwMatch != '') {
        setPwMatchComment(' - 비밀번호가 일치합니다.');
        setPwMatchCommentColor('#00A656'); // 초록색 글씨로 변경
        setPwMatchWrite(true);
      } else {
        setPwMatchComment(' - 비밀번호가 틀립니다.');
        setPwMatchCommentColor('#DD0000'); // 빨간색 글씨로 변경
        setPwMatchWrite(false);
      }
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

          <IdInput>
            <LoginInput
              type="text"
              placeholder="아이디"
              text={id}
              handleTextChange={handleIdChange}
            />
          </IdInput>

          <IdRequireText idCommentColor={idCommentColor}>
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

          <PwRequireText pwCommentColor={pwCommentColor}>
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

          <PwMatchText pwMatchCommentColor={pwMatchCommentColor}>
            {pwMatchComment}
          </PwMatchText>

          <SignUpWrapper>
            <SignUpBtn
              text="회원 가입"
              disabled={!(usernameWrite && idWrite && pwWrite && pwMatchWrite)}
              onClick={() => {
                console.log(usernameWrite);
                console.log(idWrite);
                console.log(pwWrite);
                console.log(pwMatchWrite);
                console.log('----------------');
                if (usernameWrite && idWrite && pwWrite && pwMatchWrite) {
                  navigate('/login');
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
  background: #c1e3ff;
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

  // 애니메이션 적용
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
`;

const PwMatchInput = styled.div`
  position: absolute;
  margin-top: 69%;
  z-index: 2;
`;

const PwMatchText = styled.p`
  left: 20%;
  position: absolute;
  margin-top: 78%;
  z-index: 2;
  color: ${({ pwMatchCommentColor }) => pwMatchCommentColor};
`;

const SignUpWrapper = styled.div`
  position: absolute;
  margin-top: 82%;
  z-index: 2;
`;

export default SignUpPage;
