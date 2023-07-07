import { ElRowContainer } from "./RowContainer"

export interface ElRowProps {
    useSpaceBetween?: boolean;
    children: JSX.Element | JSX.Element[]
}

export const ElRow = ({ useSpaceBetween, children }: ElRowProps) => {
    return <ElRowContainer useSpaceBetween={useSpaceBetween}>{children}</ElRowContainer>   
}
