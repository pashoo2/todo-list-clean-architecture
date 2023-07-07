import { styled } from "styled-components";

export const ElRowContainer = styled.div<{
    useSpaceBetween: boolean
}>`
    display: flex;
    flex-flow: row nowrap;
    justify-content: ${props => props.useSpaceBetween ? 'space-between' : 'stretch'};
    justify-items: stretch;
    align-items: stretch;
    flex: 100%;
    min-height: 0;
    overflow: hidden;
`
