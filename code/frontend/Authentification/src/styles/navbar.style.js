import styled from 'styled-components';

export const ContainerNav = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 10vh;
    width: 100vw;

    background-color: white;

    font-family: Arial, Helvetica, sans-serif;
`;

export const HomeNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 10%;
    
    background-color: transparent;
`;

export const Navigation = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-content: space-between;

    width: auto;
    height: 100%;

    background-color: transparent;

    padding-right: 20px;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;

        height: 100%;

    }
    div:first-child {
        padding-right: 30px;

        width: auto%;
    }
    div:last-child {
        justify-content: space-between;
        background-color: transparent;

        width: auto%;
    }
`;

export const BtnContact = styled.p`
    color: black;

    text-align: center;

    heigth: 100%;

    &:hover {
        text-decoration: underline;
    }
`;

export const BtnConnect = styled.p`
    background-color: rgb(220, 220, 220);
    color: black;

    border: 1px solid rgb(33, 33, 33);
    border-radius: 8px;

    text-align: center;
    
    heigth: 100%;
    width: 80px;
    padding: 7px;

    margin-right: 20px;

    &:hover {
        background-color: rgba(220, 220, 220, 0.6);
        border: 1px solid rgba(33, 33, 33, 0.6);
    }
`;

export const BtnEntrerpise = styled.p`
    background-color: rgb(33, 33, 33);
    color: white;

    border: 1px solid rgb(33, 33, 33);
    border-radius: 8px;

    text-align: center;

    heigth: 100%;
    width: 70px;
    padding: 7px;

    &:hover {
        background-color: rgba(33, 33, 33, 0.9);
    }
`;

export const BtnCandidat = styled.p`
    background-color: rgb(33, 33, 33);
    color: white;

    border: 1px solid rgb(33, 33, 33);
    border-radius: 8px;

    text-align: center;
    
    heigth: 10%;
    width: 70px;
    padding: 7px;
    margin-left: 5px;

    &:hover {
        background-color: rgba(33, 33, 33, 0.9);
    }
`;
