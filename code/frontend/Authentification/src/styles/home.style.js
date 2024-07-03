import styled from 'styled-components';

import backgroundImage from '../assets/hero-bg.jpg';
import loginImage from '../assets/login-img.jpg';

export const ContainerHome = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 90vh;
    width: 100%;

    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`;

export const LoginHome = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 65%;
    width: 65%;

    background-color: white;
    background-size: cover;
    background-position: center;

    padding: 10px;
`;

export const ImageHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-image: url(${loginImage});
    background-size: cover;
    background-position: center;

    color: white;

    text-align: center;
 
    margin-right: 2%;
    width: 48%;
    height: 100%;

    h1 {
      font-size: 170%;
    }

    p {
      margin: 0;
      font-size: 140%;
      padding: 8%;
    }
`;

export const FormHome = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 50%;
    height: 100%;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    div:first-child {
      background-color: transparent;

      text-align: center;
      font-size: 250%;

      height: 25%;
      width: 100%;
    }

    div:nth-child(2) {
      background-color: transparent;

      width: 80%;
      height: 35%;

      input {
         height: 30%;
         border-radius: 5px;
      }

      a {
        margin-bottom: 15px;
      }
    }

    div:nth-child(3) {
      background-color: transparent;
      height: 15%;
      width: 80%;

      button {
          height: 80%;
          width: 100%;
          border-radius: 5px;
      }
    }

    div:last-child {
      background-color: transparent;

      display: flex;
      flex-direction: row;

      justify-content: center;
      align-items: center;

      height: 10%;
    }
`;
