import { Link } from "react-router-dom"

import { getRoutePath, CUSTOMER_ROUTES_PATHS } from "../../../routes"
import { ElButton, ElLabel, ElPane, ElementSize } from "../../../components"

export const CustomerPageTodoItemsView = () => {
    return (
        <>
            <Link to={getRoutePath(CUSTOMER_ROUTES_PATHS, 'root')}>Go back</Link>
            <hr />
            <ElPane>
                <ElLabel size={ElementSize.LG}>Marvelous 2.0</ElLabel>
                <ElButton onClick={}>Delete all tasks</ElButton>
            </ElPane>
        </>
    )
}
