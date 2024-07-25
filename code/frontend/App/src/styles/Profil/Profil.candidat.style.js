import styled from 'styled-components';

export const ContainerCandidat = styled.section`
    background-color: transparent;
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
`;

export const EditProfilCandidat = styled.div`
    display: flex;
    flex-direction: row;

    height: 20px;
    widhth: 100%;

    margin: 30px;

    button {
        border: 1px solid rgba(0, 2, 0, 0.3);
        background-color: rgba(0, 2, 0, 0.05);
        height: 30px;
        border-radius: 4px;

        width: 100px;
    }
`;


export const InputContainerC = styled.div`
    display: flex;
    flex-direction: row;

    widhth: 100%;

`;

export const InputContainerCandidat = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    
    margin-left: 10%;
    margin-right: 10%;
`;

export const InputSubContainerCandidat = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
        border: 1px solid rgba(0, 2, 0, 0.08);
        background-color: rgba(0, 2, 0, 0.05);

        height: 30px;

        border-radius: 4px;
    }
`;