import { Spinner } from '@blueprintjs/core'
import { memo } from "react";
import { ElFullScreen } from "./Fullscreen";

export interface ElSpinnerProps {
    isVisible?: boolean;
    isFullScreen?: boolean;
}

export const ElSpinner = memo(({ isFullScreen = false, isVisible = false}: ElSpinnerProps) => { 
    if (!isVisible) {
        return null
    }

    const el = <Spinner></Spinner>

    if (!isFullScreen) {
        return el;
    }
    return (
        <ElFullScreen isOnTop>
            {el}
        </ElFullScreen>
    )
})
