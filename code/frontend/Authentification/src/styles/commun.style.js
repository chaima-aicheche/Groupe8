import styled from 'styled-components';

import {
    Link
} from 'react-router-dom';

export const AppBody = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100vw;

    background-color: rgb(242, 242, 242);

    font-family: Arial, Helvetica, sans-serif;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;