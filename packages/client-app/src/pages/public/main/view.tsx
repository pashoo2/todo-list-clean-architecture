import { Link } from "react-router-dom"
import { ElLabel, ElementSize } from "../../../components"
import { getRoutePath, PUBLIC_ROUTES_PATHS } from '../../../routes';

export const PageMainView = () => {
    return (
        <>
            <Link to={getRoutePath(PUBLIC_ROUTES_PATHS, 'signUp')}>
                <ElLabel size={ElementSize.LG}>
                    Sign Up
                </ElLabel>
            </Link>
            <Link to={getRoutePath(PUBLIC_ROUTES_PATHS, 'signIn')}>
                <ElLabel size={ElementSize.LG}>
                    Sign In
                </ElLabel>
            </Link>
        </>
    )
} 