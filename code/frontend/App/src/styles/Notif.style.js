import styled from 'styled-components';

export const NotifContenair = styled.section`
    background-color: transparent;
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
`;

export const NotifInfoContenair = styled.div`
    background-color: rgba(0, 2, 0, 0.05);
    display: flex;
    flex-direction: row;

    height: 20%;
    width: 100%;

    img {
        margin: 20px;
        height: 100px;
        width: 100px;
    }
    
    div:last-child {
        margin-top: 20px;
    }
`;

export const NotifSubContenair = styled.div`
    background-color: transparent;

    margin: 20px;

    height: 80%;
    width: 100%;
`;

export const Notification = styled.div`
    background-color: rgba(0, 2, 0, 0.05);
    display: flex;
    flex-direction: column;

    margin: 2px;
    padding: 10px;

    height: 30px;
    width: 95%;
`;


