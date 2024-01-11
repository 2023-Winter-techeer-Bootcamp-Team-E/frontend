import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import MinScreenWarning from './components/\bMinScreenWarning';

const GlobalStyles = createGlobalStyle`
  ${reset}
    a{
      text-decoration: none;
      color: inherit;
    } 
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #C1E3FF;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: none;
        cursor: pointer;
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }
    // Break Point
    /* $tablet: 500px; */
    $desktop: 1024px;
    $widedesktop: 2024px;

    // Mixins
    /* @mixin tablet {
      @media (min-width: #{$tablet}) {
        @content;
      }
    } */
    @mixin desktop {
      @media (min-width: #{$desktop}) {
        @content;
      }
    }
    @mixin widedesktop {
      @media (min-width: #{$widedesktop}) {
        @content;
      }
    }
    .min-screen-warning {
      display: none; // 기본적으로 숨김
    }
    @media (max-width: 1090px) {
      .min-screen-warning {
        display: block;
      }
    }
    @media screen and (max-width: 1090px) {
      #root {
        display: none;
      }
      #help {
        color: black;
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        font-weight: bold;
        z-index: 10;
      }
    }

    html {
      /* font-size: 53.125%; // 1rem = 8.5px; */
      /* @include tablet {
        font-size: 62.5%; // 1rem = 10px;
      } */
      @include desktop {
        font-size: 100%; // 1rem = 16px;
      }
      @include widedesktop {
        font-size: 120%; // 1rem = 19.2px;
      }
    }
    .over_hidden {
      overflow: hidden;
    }
`;

export default GlobalStyles;
