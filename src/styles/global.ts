"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        ::-webkit-scrollbar {
            width: 0.45rem;
        }
            ::-webkit-scrollbar-track {
                background: ${({ theme }) => theme.colors["base-shape"]}
        }
            ::-webkit-scrollbar-thumb {
                background: ${({ theme }) => theme.colors["base-red"]};
        }
    }
    body{
        background: ${({ theme }) => theme.colors["base-black"]};
        color: ${({ theme }) => theme.colors["base-white"]};
        -webkit-font-smoothing: antialiased;
    }
    body, input, textarea, button{
        font-family: ${({ theme }) => theme.fonts.regular};
        font-weight: 400;
        font-size: 1rem;
    }
    button{
        cursor: pointer;
    }
    a{
        text-decoration: none;
    }
`;
