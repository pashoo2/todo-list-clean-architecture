import { Routes, Route } from "react-router-dom"

import { PageMainView, PageLogInView, PageSignUpView } from "../pages";
import { PUBLIC_ROUTES_PATHS, getRoutePath } from "./paths";

export const PublicRoutes = () => {
    return <Routes>
        <Route index path={getRoutePath(PUBLIC_ROUTES_PATHS, 'root')} element={<PageMainView />} />
        <Route path={getRoutePath(PUBLIC_ROUTES_PATHS, 'signUp')} element={<PageSignUpView />} />
        <Route path={getRoutePath(PUBLIC_ROUTES_PATHS, 'signIn')} element={<PageLogInView />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} /> 
    </Routes>
}
