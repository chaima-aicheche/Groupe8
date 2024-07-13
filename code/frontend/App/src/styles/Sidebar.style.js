import styled from 'styled-components';

export const SidebarContenair = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 20%;
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    background-color: #F5F5F5;

    img {
        width: 40px;
        height: 40px;
    }

    ul {
        list-style-type: none;
        padding-left: 20%;
    }

    ul > li {
        margin-top: 40px;
    }

    ul ul > li {
        margin-top: 5px;
        padding-left: 10px;

        img {
            width: 20px;
            height: 20px;
        }
    }

    ul ul {
        padding-left: 40px;

        h1 {
            margin-left: 15px;
        }
    }

    div {
        display: flex;
        flex-direction: row;
        align-items: center;

        background-color: transparent;

        h1 {
            margin: 0;
            margin-left: 25px;
            width: 120px;

            color: rgb(0, 0, 0, 0.8);

            &:hover {
                color: black;
            }
        }
    }

    a {
        text-decoration: none;
        color: inherit;

        &:hover {
            text-decoration: none;
        }
    }
`;
