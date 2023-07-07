import { Routes, Route } from "react-router-dom"

import { CustomerPageMainView, CustomerPageTodoItemsView } from '../pages';
import { CUSTOMER_ROUTES_PATHS, getRoutePath } from "./paths";
import { NavigateTo } from "../components";

export const CustomerRoutes = () => {
    const rootRoute = getRoutePath(CUSTOMER_ROUTES_PATHS, 'root');
    return <Routes>
        <Route path={rootRoute} element={<CustomerPageMainView />} />
        <Route path={getRoutePath(CUSTOMER_ROUTES_PATHS, 'todoItemsList')} element={<CustomerPageTodoItemsView />} />
        <Route path="*" element={<NavigateTo targetPath={rootRoute} />} /> 
    </Routes>
}
