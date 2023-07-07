import { observer } from 'mobx-react'
import { useMemo } from "react"
import { Link } from "react-router-dom"

import { PageLogInViewModel } from './view-model'
import { ElPane, ElButton, ElSpinner, ElError, ElInput, ElInputWithLabel, ElLabel, NavigateTo } from "../../../components"
import { PUBLIC_ROUTES_PATHS, getRoutePath } from "../../../routes"

const ID_GROUP_EMAIL = "page_login_email"
const ID_GROUP_PWD = "page_login_password"
export const PageLogInView = observer(() => {
    const viewModel = useMemo(() => new PageLogInViewModel(), [])

    return (
        <>
            <NavigateTo targetPath={viewModel.openRoutePath} />
            <ElSpinner isVisible={viewModel.isInProgress} isFullScreen />
            <ElPane>
                <Link to={getRoutePath(PUBLIC_ROUTES_PATHS, 'root')}>Go back</Link>
                <hr />
                <ElInputWithLabel
                    inputId={ID_GROUP_EMAIL}
                    input={<ElInput id={ID_GROUP_EMAIL} type="email" value={viewModel.email} onChange={viewModel.setEmail} />}
                    label={<ElLabel>Email</ElLabel>}
                />
                <ElInputWithLabel
                    inputId={ID_GROUP_PWD}
                    input={<ElInput id={ID_GROUP_PWD} type="password" value={viewModel.password} onChange={viewModel.setPassword} />}
                    label={<ElLabel>Password</ElLabel>}
                />
                <ElButton onClick={viewModel.submit}>Log In</ElButton>
                {viewModel.isError ? <>{
                    viewModel.errors.map(error => {
                        return <ElError key={error.message} error={error} />
                    })
                }</> : null}
            </ElPane>
        </>
    )
})
