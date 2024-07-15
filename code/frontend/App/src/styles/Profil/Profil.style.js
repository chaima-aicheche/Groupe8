import styled from 'styled-components';

export const ContainerProfil = styled.section`
    background-color: transparent;
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;

`;

export const HeaderProfil = styled.div`
    background-color: white;

    height: 38%;
    width: 100%;
`;

export const ContainerHeaderProfil = styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

export const InfoHeaderProfil = styled.div`
    height: 90%;
    width: 100%;
    background-color: transparent;

    display: flex;
    flex-direction: row;

    div:first-child {
        background-color: transparent;
        width: 25%;

        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 150px;
            height: 150px;
        }
    }

    div:last-child {
        background-color: transparent;
        width: 35%;
        padding-top: 70px;
    }
`;

export const NavProfil = styled.div`
    background-color: #F5F5F5;

    border-bottom: 0.5px solid rgb(0, 0, 0, 0.05);

    display: flex;
    flex-direction: row;

    height: 9%;
    width: 100%;
`;

export const BtnNavProfil = styled.div`
    background-color: transparent;

    display: flex;
    align-items: center;

    margin-left: 10px;
    margin-right: 10px;

    height: 100%;
    width: 20%;

    justify-content: center;

    button {
        border: none;
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
`;

export const InfoProfil = styled.div`
    background-color: white;

    height: 68%;
    width: 100%;
`;