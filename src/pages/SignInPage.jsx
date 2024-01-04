import React, { useState } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import SignInBtn from '../components/SignIn_Up';
import SmallSketchbook from '../components/SmallSketchbook';
import sketbook from '../../public/img/HaruConnectingBook.png';
import LoginBar from '../components/LoginBar';


function SignInPage(props) {

    
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        // 여기서는 간단하게 입력된 정보를 콘솔에 출력하고 MainPage로 이동하도록 하겠습니다.
        console.log('Username:', username);
        console.log('Password:', password);

        // 실제로는 서버 요청 등을 통해 입력된 정보를 확인하고 로그인 처리를 해야 합니다.
        // 로그인 처리 후 MainPage로 이동하도록 구현해야 합니다.
        // 예를 들어, 다음과 같이 MainPage로 이동할 수 있습니다.
        // props.history.push('/main'); // MainPage 경로로 이동
    };
    const GoToSignUp = () => {
        console.log("Go To SignUp");
    }

    return (
        <BackLayout>
            <PageFrame>
                <SketDiv>
                    <SignInText>Login</SignInText>

                    <SmallSketchbook />
                    <IdInput>
                        <LoginBar
                            type="text"
                            placeholder="아이디"
                            text={id}
                            handleTextChange={handleIdChange}
                        />
                    </IdInput>

                    <PwInput>
                        <LoginBar
                            type="password"
                            placeholder="비밀번호"
                            text={password}
                            handleTextChange={handlePasswordChange}
                        />
                    </PwInput>

                    <SignInInput>
                        <SignInBtn text="일기장 펼치기" />
                    </SignInInput>

                    <Line />

                    <SignUpText onClick={GoToSignUp}>회원 가입</SignUpText>
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
  background: #C1E3FF;
`

const PageFrame = styled.div`
/* background : #AAA; */
  position: absolute;
  width: 108rem;
  height: 70rem;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  display : flex;
  place-items: center;
`
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
  position : absolute;
  width: 60.75rem;   
  height: 59.8125rem;   
  display: flex;   
  justify-content: center;  
  margin-top : 3%;   
  margin-left : 2.314814815%;
  
  // 애니메이션 적용
  animation: ${slideUp} 1s ease-out;
  `;
const SignInText = styled.div`
  color: #3CB5FA;
  font-family: Arial Black;
  font-size: 6rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  position: absolute;
  z-index: 3;
  margin-top : 10%;
`

const SketBook = styled.img`
position : absolute;
width: 42.6875rem;
height: 51.875rem;
flex-shrink: 0;
margin-left : 60%;
`
const IdInput = styled.div`
  position: absolute;
  margin-top: 38%; 
  z-index: 2;
`;


const PwInput = styled.div`
    position : absolute;
    margin-top: 48%; 
    z-index : 2;
`

const SignInInput = styled.div`
    position : absolute;
    margin-top : 62%;
    z-index : 2;
`

const Line = styled.hr`
position : absolute;
width: 46.93769rem;
height: 0.0625rem;
background: #E1E1E1;
margin-top : 73%;
z-index:2;
`

const SignUpText = styled.div`
color: #C4C4C4;
font-family: Arial Black;
font-size: 1.25rem;
font-style: normal;
font-weight: 900;
line-height: normal;
position : absolute;
margin-top : 75%;
z-index: 2;
`

export default SignInPage;