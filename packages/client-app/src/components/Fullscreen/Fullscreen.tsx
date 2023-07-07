import { createPortal } from 'react-dom'
import { ElFullScreenContainer } from "./FullscreenContainer";

export interface ElFullScreenProps {
    isOnTop?: boolean;
    children?: JSX.Element | JSX.Element[]
}

export const ElFullScreen = ({ isOnTop = false, children = null }: ElFullScreenProps) => {
    const el = <ElFullScreenContainer isOnTop={isOnTop}>{children}</ElFullScreenContainer>

    if (!isOnTop) {
        return el;
    }
    return createPortal(el, document.body)
}
