import { observer } from 'mobx-react'
import { useMemo } from "react"
import { Alert } from "@blueprintjs/core"

import { PageLogOutViewModel } from './view-model'
import { ElSpinner, ElError, NavigateTo, ElButton } from "../../../components"

export const PageLogOutView = observer(() => {
    const viewModel = useMemo(() => new PageLogOutViewModel(), [])

    return (
        <>
            <NavigateTo targetPath={viewModel.openRoutePath} />
            <ElSpinner isVisible={viewModel.isInProgress} isFullScreen />
            <Alert 
                isOpen={viewModel.isOpenConfirmationDialog} 
                icon="info-sign"
                confirmButtonText="Yes"
                onConfirm={viewModel.logOut}
                cancelButtonText="No"
                onCancel={viewModel.onLogOutCancelClick}
            >
                Are you sure?
            </Alert>
            <ElButton onClick={viewModel.onLogOutClick}>Log out</ElButton>
            {Boolean(viewModel.isError) && <>{
                    viewModel.errors.map(error => {
                        return <ElError key={error.message} error={error} />
                    })
                }</>}
        </>
    )
})
