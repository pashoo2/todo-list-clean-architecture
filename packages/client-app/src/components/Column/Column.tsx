import { ElColumnContainer } from "./ColumnContainer"
import { ElementSize } from '../enum';

export interface ElColumnProperties {
    widthSize: ElementSize;
    children: JSX.Element | JSX.Element[]
}

export const ElColumn = (
    props: ElColumnProperties
) => {
    const { children, widthSize } = props
    return <ElColumnContainer width={widthSize}>{children}</ElColumnContainer>
}
