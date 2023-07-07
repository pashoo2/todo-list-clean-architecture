import { styled, createGlobalStyle, css } from "styled-components";

const flexContainer = css`
    display: flex;
    flex: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
    justify-content: start;
    justify-items: start;
    min-height: 0;
`

const noMarginPadding = css`
    margin: 0;
    padding: 0;
    border: 0;
`

const maxContainerSize = css`
    box-sizing: border-box;
    overflow: hidden;
    max-height: 100%;
    max-width: 100%;
` 

export const CustomerPageTodoItemsViewPageContainerRootStyle = createGlobalStyle`
    html {
        max-width: 100vw;
        max-height: 100vh;
        ${flexContainer}
        overflow: hidden;
        flex: 1 0 100vh;
    }
    body {
        ${flexContainer}
        ${noMarginPadding}
        ${maxContainerSize}

        & > div {
            ${flexContainer}
            ${noMarginPadding}
            ${maxContainerSize}
        }
    }
`

export const CustomerPageTodoItemsViewPageContainer = styled.div`
    ${flexContainer}
    max-height: 100%;
    min-height: 0;
    box-sizing: border-box;
    overflow: hidden;
    margin: 10px;
    flex-flow: column nowrap;
    border: 3px solid #000;
    border-radius: 4px;
    padding: 5px;
`