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

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

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
        border: 1px solid #ccc;
        padding: 3px;

        &::placeholder {
          padding-left: 10px;
          color: rgba(0, 0, 0, 0.4);
          font-style: italic;
        }

        &:hover {
          border: 1px solid rgba(0, 0, 0, 0.3);
        }
      }

      a {
        margin-bottom: 15px;
        color: rgb(22, 175, 204);

        &:hover {
          color: rgba(22, 175, 204, 0.6);
          text-decoration: underline;
        }
      }
    }

    div:nth-child(3) {
      background-color: transparent;
      height: 15%;
      width: 80%;

      a, button {
          text-decoration: none;
          display: flex;
          height: 80%;
          width: 100%;
          border-radius: 5px;
          border: 0;
          align-items: center;
          justify-content: center;

          background-color: rgb(22, 175, 204);
          color: white;
            border: 2px solid rgba(22, 175, 204, 0);

          &:hover {
            background-color: rgba(22, 175, 204, 0.6);
            border: 2px solid rgba(22, 175, 204, 0.6);
            color: black;
          }
      }
    }

    div:nth-child(4) {

      display: flex;
      flex-direction: column;
      align-items: center;

      width: 80%;

      div:first-child {
        border: none;
        height: 1px;
        background-color: #ccc;
        margin-bottom: 10px;
      }

      img {
        width: 25px;
        height: 25px;
        margin: 5px;
      }

      button {
        display: flex;
        flex-direction: row;

        width: auto;

        text-align: center;
        align-items: center;
      }
    }

    div:last-child {
      background-color: transparent;

      display: flex;
      flex-direction: row;

      justify-content: center;
      align-items: center;

      height: 10%;

      a {
        color: rgb(22, 175, 204);
        
        &:hover {
          color: rgba(22, 175, 204, 0.6);
          text-decoration: underline;
        }
      }
    }
`;
