import styled, { css } from 'styled-components'

export const ElFullScreenContainer = styled.div<{ isOnTop: boolean }>`
    display: flex;
    flex: 1;
    flex-flow: column no-wrap;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    ${props => props.isOnTop 
        ? css`
            background-color: #000;
            opacity: .2;
            text-selection: none;
            user-select: none;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 99;
        `
        : ''}
`;
