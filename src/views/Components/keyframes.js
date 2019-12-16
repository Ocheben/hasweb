/* eslint-disable import/prefer-default-export */
import { css, keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
`;

export const noAnimation = keyframes`
  0% {
    opacity:1;
  }
  100% {
    opacity:1;
  }
`;

export const fadeAnimation = css`
    animation: ${fadeIn} 2s liner;
`;
