import { TodoItemAggregateData } from "@react-node-monorepo/domain";

import { ElLabel } from "../Label";
import { ElementSize } from "../enum";
import { ElCheckbox } from "../Checkbox";
import { useCallback } from "react";
import { ElTodoItemContainer } from "./TodoItem.Container";

export interface ElTodoItemProps {
    children: TodoItemAggregateData;
    onIsDoneClicked(id: string, isDone: boolean): void; 
}

export const ElTodoItem = (props: ElTodoItemProps): JSX.Element => {
    const { children: todoItem, onIsDoneClicked } = props
    const { id, description, isDone } = todoItem

    const cbIsDoneClicked = useCallback(() => {
        onIsDoneClicked(id, !isDone)
    }, [id, onIsDoneClicked, isDone]) 

    return (
        <ElTodoItem.Container>
            <ElCheckbox value={isDone === true} onClick={cbIsDoneClicked} />
            <ElLabel size={ElementSize.SM}>{description.description}</ElLabel>
        </ElTodoItem.Container>
    )
}

ElTodoItem.Container = ElTodoItemContainer
