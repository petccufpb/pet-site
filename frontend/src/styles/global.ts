"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ pathname: string }>`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        -webkit-font-smoothing: subpixel-antialiased;
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
        background: black;
        background: ${({ theme, pathname }) =>
          pathname.split("/")[1] === "sdc" ? theme.colors.sdc["background"] : "black"};
        color: white;
        color: ${({ theme }) => theme.colors["base-white"]};
        position: relative;
        font-family: ${({ theme }) => theme.fonts.regular};

        min-height: 100vh;
    }

    body, input, textarea, button {
        font-family: ${({ theme }) => theme.fonts.regular};
        font-weight: 400;
        font-size: 1rem;
    }

    button,
    img,
    svg {
        background: transparent;
        border: none;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    html, body {
        overflow-x: hidden;
    }

    main {
        word-wrap: break-word;
        height: 100%;
    }

    /* body > div {
        overflow-x: hidden;
    } */

    input, button {
        font-family: inherit;
    }

    label{
        cursor: text;
    }
`;
