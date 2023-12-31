import { styled, keyframes } from "@mui/system";
import { Box } from "@mui/material";
import starsBackgroundURL from "@images/starsBackground.jpg";

const animateBg = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const animate = keyframes`
  0% {
    transform: rotate(305deg) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(305deg) translateX(-1500px);
    opacity: 0;
  }
`;

export const StarsSection = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${starsBackgroundURL});
  background-position-x: center;
  background-size: cover;
  animation: ${animateBg} 50s linear infinite;

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
      0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 1);
    animation: ${animate} 3s linear infinite;
  }

  & span::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 1px;
    background: linear-gradient(90deg, #fff, transparent);
  }

  & span:nth-of-type(1) {
    top: -10px;
    right: 0;
    left: initial;
    animation-delay: 0;
    animation-duration: 1s;
  }

  & span:nth-of-type(2) {
    top: -10px;
    right: 80px;
    left: initial;
    animation-delay: 0.2s;
    animation-duration: 3s;
  }

  & span:nth-of-type(3) {
    top: 80px;
    right: 0px;
    left: initial;
    animation-delay: 0.4s;
    animation-duration: 2s;
  }

  & span:nth-of-type(4) {
    top: -10px;
    right: 180px;
    left: initial;
    animation-delay: 0.6s;
    animation-duration: 1.5s;
  }

  & span:nth-of-type(5) {
    top: -10px;
    right: 400px;
    left: initial;
    animation-delay: 0.8s;
    animation-duration: 2.5s;
  }

  & span:nth-of-type(6) {
    top: -10px;
    right: 600px;
    left: initial;
    animation-delay: 1s;
    animation-duration: 3s;
  }

  & span:nth-of-type(7) {
    top: 300px;
    right: 0px;
    left: initial;
    animation-delay: 1s;
    animation-duration: 1.75s;
  }

  & span:nth-of-type(8) {
    top: -10px;
    right: 700px;
    left: initial;
    animation-delay: 1.4s;
    animation-duration: 1.25s;
  }

  & span:nth-of-type(9) {
    top: -10px;
    right: 1000px;
    left: initial;
    animation-delay: 0.75s;
    animation-duration: 2.25s;
  }

  & span:nth-of-type(10) {
    top: -10px;
    right: 1000px;
    left: initial;
    animation-delay: 2.75s;
    animation-duration: 2.25s;
  }
`;

export default StarsSection;
