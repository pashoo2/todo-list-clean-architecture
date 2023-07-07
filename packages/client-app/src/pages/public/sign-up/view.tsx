import { observer } from 'mobx-react'
import { useMemo } from "react"
import { Alert } from "@blueprintjs/core"
import { Link } from "react-router-dom"

import { PageSignUpViewModel } from './view-model'
import { ElPane, ElButton, ElSpinner, ElError, ElInput, ElInputWithLabel, ElLabel, NavigateTo } from "../../../components"
import { PUBLIC_ROUTES_PATHS, getRoutePath } from "../../../routes"

const ID_GROUP_NAME = "page_sign-up_name"
const ID_GROUP_EMAIL = "page_sign-up_email"
const ID_GROUP_PWD = "page_sign-up_password"
export const PageSignUpView = observer(() => {
    const viewModel = useMemo(() => new PageSignUpViewModel(), [])

    return (
        <>
        <NavigateTo targetPath={viewModel.openRoutePath} />
        <Alert isOpen={viewModel.isSuccess} icon="info-sign" confirmButtonText="Go to Sign In page" onConfirm={viewModel.openSignIn}>You are successfully registered</Alert>
        <ElSpinner isVisible={viewModel.isInProgress} isFullScreen />
        <ElPane>
            <Link to={getRoutePath(PUBLIC_ROUTES_PATHS, 'root')}>Go back</Link>
            <hr />
            <ElInputWithLabel
                inputId={ID_GROUP_NAME}
                input={<ElInput id={ID_GROUP_NAME} value={viewModel.name} onChange={viewModel.setName} />}
                label={<ElLabel>Name</ElLabel>}
            />
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
            <ElButton onClick={viewModel.submit}>Sign Up</ElButton>
            {viewModel.isError ? <>{
                viewModel.errors.map(error => {
                    return <ElError key={error.message} error={error} />
                })
            }</> : null}
        </ElPane>
        </>
    )
})
