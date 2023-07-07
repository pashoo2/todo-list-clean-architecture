import { Button } from '@blueprintjs/core'

export interface ElButtonProps {
    children: string | JSX.Element;
    isDisabled?: boolean;
    onClick(): void;
}

export const ElButton = (props: ElButtonProps) => {
    const { onClick, children, isDisabled } = props
    return <Button disabled={isDisabled} onClick={onClick}>{children}</Button>
}
