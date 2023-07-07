import { Link } from "react-router-dom"
import { CUSTOMER_ROUTES_PATHS, getRoutePath } from "../../../routes"
import { PageLogOutView } from "../../public"

export const CustomerPageMainView = () => {
    return (
        <>
            Customer.
            <PageLogOutView />
            <hr />
            <Link to={getRoutePath(CUSTOMER_ROUTES_PATHS, 'todoItemsList')}>TODO items</Link>
        </>
    )
}
