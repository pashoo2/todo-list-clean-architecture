import { styled } from "styled-components";
import { ElementSize } from "../enum";

export const ElColumnContainer = styled.div<{
    width: ElementSize
}>`
    max-width: ${props => props.width === ElementSize.LG ? '80%' : '50%'};
    width: ${props => props.width === ElementSize.LG ? '80%' : '50%'};
    overflow: auto;
    box-sizing: border-box;
    margin: 0;
    padding: 10px;

    &::-webkit-scrollbar {
        width: 5px;
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
            
            &-track {
                background: #f1f1f1;
            }
          
            &-thumb {
                background: #888;
            }
          
            &-thumb:hover {
                background: #555;
            }
    }
`
