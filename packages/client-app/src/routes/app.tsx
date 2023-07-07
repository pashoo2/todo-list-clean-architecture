import { observer } from 'mobx-react'

import { PublicRoutes } from "./public"
import { AppUserRole, appState } from "../application"
import { CustomerRoutes } from "./customer"
import { AdminRoutes } from "./admin"

export const AppRoutes = observer(() => {
    const userRole = appState.user.userRole
    if (userRole === AppUserRole.CUSTOMER) {
        return <CustomerRoutes />
    }
    if (userRole === AppUserRole.ADMIN) {
        return <AdminRoutes />
    }
    return <>
        <PublicRoutes />
    </>
})