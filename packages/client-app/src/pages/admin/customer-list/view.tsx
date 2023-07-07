import { useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { CustomerEntityImpl } from "@react-node-monorepo/domain";
import { Link } from "react-router-dom";

import { AdminPageCustomerListViewModel } from "./view-model";
import { ElButton, ElSpinner } from "../../../components";
import { ADMIN_ROUTES_PATHS, getRoutePath } from "../../../routes";

export const AdminPageCustomerListView = observer(() => {
    const viewModel = useMemo(() => new AdminPageCustomerListViewModel(), [])

    useEffect(() => {
        viewModel.load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    debugger
    return <>
        <Link to={getRoutePath(ADMIN_ROUTES_PATHS, 'root')}>Go back</Link>
        <hr />
        <ElSpinner isVisible={viewModel.isInProgress} isFullScreen />
        <table className="bp5-html-table">
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Registered</th>
                <th>Modified</th>
                </tr>
            </thead>
            <tbody>
                {viewModel.list.map(({id, name, email, dateCreated = new Date(), dateModified = new Date()}: CustomerEntityImpl) => {
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name.name}</td>
                            <td>{email.email}</td>
                            <td>{dateCreated.toUTCString()}</td>
                            <td>{dateModified.toUTCString()}</td>
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Total: {viewModel.total}</td>
                    <td>On page: {viewModel.list.length}</td>
                    <td>Offset: {viewModel.offset}</td>
                </tr>
            </tfoot>
        </table>
        <ElButton isDisabled={!viewModel.isPossibleToOpenPrevPage} onClick={viewModel.loadPrevPage}>Prev</ElButton>
        <ElButton isDisabled={!viewModel.isPossibleToOpenNextPage} onClick={viewModel.loadNextPage}>Next</ElButton>
    </>
}) 