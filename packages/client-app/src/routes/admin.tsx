import { Routes, Route } from "react-router-dom"

import { AdminPageCustomerListView, AdminPageMainView } from "../pages";
import {ADMIN_ROUTES_PATHS, getRoutePath } from "./paths";
import { NavigateTo } from "../components";

export const AdminRoutes = () => {
    const root = getRoutePath(ADMIN_ROUTES_PATHS, 'root')
    return <Routes>
        <Route index path={root} element={<AdminPageMainView />} />
        <Route path={getRoutePath(ADMIN_ROUTES_PATHS, 'customerList')} element={<AdminPageCustomerListView />} />
        <Route path="*" element={<NavigateTo targetPath={root} />} /> 
    </Routes>
}
