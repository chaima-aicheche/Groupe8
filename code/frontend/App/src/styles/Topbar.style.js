import styled from 'styled-components';

export const TopbarContenair = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 6.9vh;

    background-color: white;
    padding-left: 20px;

    border-bottom: 1px solid rgb(0, 0, 0, 0.05);
`;

export const TopbarSubContenair = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 30px;

    background-color: transparent;

    div {
        padding-left: 20px;
    }

    img {
        width: 25px;
    }

`;