import { Navigate } from 'react-router-dom';
import { memo } from 'react'

export interface NavigateToProps {
    targetPath?: string | null
}

export const NavigateTo = memo(({ targetPath }: NavigateToProps) => {    
    if (!targetPath) {
        return <></>
    }
    return <Navigate replace to={targetPath} />
})
