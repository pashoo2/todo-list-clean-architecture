import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"

import { getRoutePath, CUSTOMER_ROUTES_PATHS } from "../../../routes"
import { ElButton, ElErrors, ElInput, ElLabel, ElRow, ElSpinner, ElementSize } from "../../../components"
import { CustomerPageTodoItemsViewModel } from "./view-model"
import { CustomerPageTodoItemsViewList } from "./view-list"
import { CustomerPageTodoItemsViewPageContainer, CustomerPageTodoItemsViewPageContainerRootStyle } from "./components"
import { CustomerPageTodoItemsViewModelList } from "./view-model-list"

export const CustomerPageTodoItemsView = observer(() => {
    const viewModel = useMemo(() => new CustomerPageTodoItemsViewModel(), [])
    const viewModelListIsDone = useMemo(() => new CustomerPageTodoItemsViewModelList(true), [])
    const viewModelListToDo = useMemo(() => new CustomerPageTodoItemsViewModelList(false), [])

    const [filterText, setFilterText] = useState('') // TODO: use view model value
 
    const onSearchFilterByDescriptionChange = useCallback((filter: string) => {
        // TODO: use debounce
        viewModelListIsDone.setDescriptionFilter(filter)
        viewModelListToDo.setDescriptionFilter(filter)
        setFilterText(filter)
    }, [viewModelListIsDone, viewModelListToDo, setFilterText])

    const clear = useCallback(() => {
        viewModel.deleteAll()
        viewModelListIsDone.deleteAll()
        viewModelListToDo.deleteAll()
    }, [viewModel, viewModelListIsDone, viewModelListToDo])

    return (
        <CustomerPageTodoItemsViewPageContainer>
            <CustomerPageTodoItemsViewPageContainerRootStyle />
            <ElSpinner isVisible={viewModel.isInProgress} isFullScreen />
            <Link to={getRoutePath(CUSTOMER_ROUTES_PATHS, 'root')}>Go back</Link>
            <hr />
            <ElRow useSpaceBetween>
                <ElLabel size={ElementSize.LG}>Marvelous 2.0</ElLabel>
                <ElButton link onClick={clear}>Delete all tasks</ElButton>
            </ElRow>
            <ElRow useSpaceBetween>
                <ElRow>
                    <ElInput type="text" value={viewModel.todoItemDescription} onChange={viewModel.setTODOItemDescription} />
                    <ElButton size={ElementSize.SM} onClick={viewModel.createTodoItemFromDescription}>Save</ElButton>
                </ElRow>
                <ElInput 
                    type="text"
                    value={filterText}
                    onChange={onSearchFilterByDescriptionChange}
                />
            </ElRow>
            <ElErrors errors={viewModel.errors} />
            <hr />
            <ElRow>
                <CustomerPageTodoItemsViewList viewModel={viewModelListToDo} label={<ElLabel size={ElementSize.LG}>TODO</ElLabel>} />
                <CustomerPageTodoItemsViewList viewModel={viewModelListIsDone} label={<ElLabel size={ElementSize.LG}>DONE</ElLabel>} />
            </ElRow>
        </CustomerPageTodoItemsViewPageContainer>
    )
})
