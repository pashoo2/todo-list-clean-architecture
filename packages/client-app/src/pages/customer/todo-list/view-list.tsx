import { useEffect } from "react"
import { observer } from "mobx-react"
import VisibilitySensor from 'react-visibility-sensor'

import { ElButton, ElColumn, ElSpinner, ElementSize } from "../../../components"
import { CustomerPageTodoItemsViewModelList } from "./view-model-list"
import { ElTodoItem } from "../../../components/TodoItem"

export interface CustomerPageTodoItemsViewListProps {
    label: JSX.Element;
    viewModel: CustomerPageTodoItemsViewModelList;
}

export const CustomerPageTodoItemsViewList = observer(({ viewModel, label }: CustomerPageTodoItemsViewListProps) => {
    useEffect(() => {
        viewModel.load()
    }, [viewModel])

    return (
        <ElColumn widthSize={ElementSize.SM}>
            {label}
            <ElSpinner isVisible={viewModel.isInProgress} />
            <>{viewModel.list.map((todoItem, idx) => (
                <ElTodoItem 
                    key={todoItem.id}
                    onIsDoneClicked={viewModel.onTodoItemStatusChange}
                >
                    {todoItem}
                </ElTodoItem>
            ))}</>
            {!viewModel.isReachedEnd
                // (<VisibilitySensor onChange={viewModel.onLastElementVisibilityChange}>
                //     {({isVisible}) =>
                //         <ElButton isDisabled={!isVisible || !viewModel.isPossibleToOpenNextPage} onClick={viewModel.loadNext}>More...</ElButton>
                //     }
                // </VisibilitySensor>) 
                ? <ElButton isDisabled={!viewModel.isPossibleToOpenNextPage} onClick={viewModel.loadNext}>More...</ElButton>
                : null}
        </ElColumn>
    )
})
