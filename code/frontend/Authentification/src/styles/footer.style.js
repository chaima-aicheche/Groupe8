import styled from 'styled-components';

export const ContainerFooter = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 35vh;
    width: 100vw;

    padding-top: 10%;
    background: linear-gradient(to bottom, rgb(242, 242, 242), rgb(90, 152, 170));
    font-family: Arial, Helvetica, sans-serif;

    div {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        justify-content: space-between;

        align-items: center;
        text-align: center;

        background-color: transparent;

        margin-left: 50px;
        margin-right: 50px;

        width: 15%;
        height: 40%;
    }

    a {
        width: 100%;

        &:hover {
            text-decoration: underline;
        }
    }
`;


