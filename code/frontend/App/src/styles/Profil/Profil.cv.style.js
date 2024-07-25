import styled from 'styled-components';

export const ContainerCv = styled.section`
    background-color: transparent;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;

`;

export const SubContainerCv = styled.div`
    background-color: transparent;

    height: 60%;
    width: 60%;

    div:first-div {
        border: 1px solid rgb(0, 0, 0, 0.05);
    }
`;

export const UploadCv = styled.div`
    background-color: transparent;

    border: 1px solid rgb(0, 0, 0, 0.05);

    padding: 50px;
`;