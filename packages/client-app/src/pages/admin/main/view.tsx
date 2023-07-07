import { Link } from "react-router-dom"
import { ADMIN_ROUTES_PATHS, getRoutePath } from "../../../routes"
import { PageLogOutView } from "../../public"

export const AdminPageMainView = () => {
    return (
        <>
            Admin.
            <PageLogOutView />
            <hr />
            <Link to={getRoutePath(ADMIN_ROUTES_PATHS, 'customerList')}>Customers table</Link>
        </>
    )
}
