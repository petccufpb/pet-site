"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ pathname: string }>`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        ::-webkit-scrollbar {
            width: 0.45rem;
        }
            // Pode mudar.
            ::-webkit-scrollbar-track {
                background: ${({ theme }) => theme.colors["second-blue"]}
        }
            ::-webkit-scrollbar-thumb {
                background: ${({ theme }) => theme.colors["base-blue"]};
        }
    }
    body {
        background: ${({ theme, pathname }) =>
          pathname === "/sdc" ? theme.colors.sdc["background"] : theme.colors["second-blue"]};
        color: ${({ theme }) => theme.colors["base-white"]};
        -webkit-font-smoothing: antialiased;
    }
    body, input, textarea, button {
        font-family: ${({ theme }) => theme.fonts.regular};
        font-weight: 400;
        font-size: 1rem;
        overflow-x: hidden;
    }
    button {
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
`;
