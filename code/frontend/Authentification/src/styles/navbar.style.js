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
    color: ${props => props.isActive ? 'black' : 'initial'};
    border: ${props => props.isActive ? '1px solid rgba(22, 175, 204, 0.4)' : '1px solid transparent'};
    border-radius: ${props => props.isActive ? '8px' : 'initial'};

    text-align: center;

    heigth: 100%;

    &:hover {
        text-decoration: ${props => props.isActive ? '' : 'underline'};
    }
    padding: 7px;
`;



export const BtnConnect = styled.p`
    color: ${props => props.isActive ? 'black' : 'initial'};
    border: ${props => props.isActive ? '1px solid rgba(22, 175, 204, 0.4)' : '1px solid transparent'};
    border-radius: ${props => props.isActive ? '8px' : 'initial'};

    text-align: center;

    heigth: 100%;

    &:hover {
        text-decoration: ${props => props.isActive ? '' : 'underline'};
    }

    margin-right: 20px;
    padding: 7px;
`;

export const BtnEntrerpise = styled.p`
    color: ${props => props.isActive ? 'black' : 'initial'};
    border: ${props => props.isActive ? '1px solid rgba(22, 175, 204, 0.4)' : '1px solid transparent'};
    border-radius: ${props => props.isActive ? '8px' : 'initial'};

    text-align: center;

    heigth: 100%;

    &:hover {
        text-decoration: ${props => props.isActive ? '' : 'underline'};
    }
    padding: 7px;
`;

export const BtnCandidat = styled.p`
    color: ${props => props.isActive ? 'black' : 'initial'};
    border: ${props => props.isActive ? '1px solid rgba(22, 175, 204, 0.4)' : '1px solid transparent'};
    border-radius: ${props => props.isActive ? '8px' : 'initial'};
    text-align: center;

    heigth: 100%;

    &:hover {
        text-decoration: ${props => props.isActive ? '' : 'underline'};
    }
    padding: 7px;
    padding: 7px;
    margin-left: 5px;
`;

