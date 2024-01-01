module.exports = {
  root: true, // 루트 디렉토리에서 ESLint 설정을 시작한다는 의미
  env: {
    browser: true, // 브라우저 환경을 지원한다는 의미
    es6: true, // ECMAScript 6(ES6) 문법을 지원한다는 의미
  },
  plugins: ['prettier', 'react'], // 사용할 ESLint 플러그인을 지정
  extends: [
    // 다른 config를 사용하더라도 prettier를 맨 마지막에 넣어야 모든 중복 규칙을 비활성화 시킬 수 있다.
    'airbnb', // Airbnb 스타일 가이드를 기반으로 하는 ESLint 규칙을 사용한다는 의미
    'prettier', // Prettier와 관련된 ESLint 규칙을 사용한다는 의미
    'plugin:import/errors', // import 구문에 대한 오류를 감지하기 위한 규칙을 사용한다는 의미
    'plugin:import/warnings', // import 구문에 대한 경고를 감지하기 위한 규칙을 사용한다는 의미
    'eslint:recommended', // 기본적인 ESLint 규칙을 사용한다는 의미
    'plugin:react/jsx-runtime', // JSX 요소를 사용할 때 React가 필요하다는 경고를 피하기 위한 설정
    'plugin:prettier/recommended', // Prettier와 관련된 ESLint 규칙을 사용한다는 의미
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-param-reassign': 0, // 매개변수의 값을 수정하는 것을 허용
    'global-require': 0, // require 함수를 전역에서 사용하는 것을 허용
    'no-console': 0, // console.log 등의 console 사용을 허용
    'no-undef': 'off', // 정의되지 않은 변수를 사용하는 것을 허용
    'no-unused-vars': 'off', // 사용하지 않는 변수에 대한 경고를 허용
    'linebreak-style': 0, // 개행 스타일을 무시
    'import/prefer-default-export': 0, // 모듈에서 단일 default export를 요구하지 않음
    'prettier/prettier': 0, // Prettier 관련 규칙 비활성화
    'import/extensions': 0, // 파일 확장자가 있는 import 구문을 요구하지 않음
    'no-use-before-define': 0, // 변수가 정의되기 전에 사용하는 것을 허용
    'import/no-unresolved': 0, // 해결되지 않은 import 경로를 허용
    'import/no-extraneous-dependencies': 0, // devDependency를 테스트 또는 개발환경 구성 파일에서 허용
    'no-shadow': 0, // 외부 범위에서 선언된 변수와 동일한 이름의 변수를 사용하는 것을 허용
    'react/prop-types': 0, // PropTypes 사용을 요구하지 않음
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // .js, .jsx, .ts, .tsx 확장자 파일에서 JSX를 사용할 수 있도록 허용
    'jsx-a11y/no-noninteractive-element-interactions': 0, // 상호 작용하지 않는 요소에 이벤트 핸들러 사용을 허용
    '@typescript-eslint/no-var-requires': 0, // require 구문 사용을 허용
  },
};
