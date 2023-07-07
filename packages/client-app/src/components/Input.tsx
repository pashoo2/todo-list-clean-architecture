
import { InputGroup } from '@blueprintjs/core'
import { handleStringChange } from "@blueprintjs/docs-theme";
import { ElementSize } from "./enum";

export interface ElInputProps {
    value: string;
    id?: string;
    type?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    size?: ElementSize;
    onChange(newValue: string): void;
}

export const ElInput = (props: ElInputProps) => {
    const { value, id, isDisabled, isReadOnly, size, type, onChange } = props

    const isLarge = size === ElementSize.LG

    const onChangeCallback = handleStringChange((newValue: string) => {
        onChange(newValue);
    })

    return (
        <InputGroup
            id={id}
            disabled={isDisabled}
            readOnly={isReadOnly}
            large={isLarge}
            small={!isLarge}
            value={String(value)}
            type={type}
            onChange={onChangeCallback}
        />
    )
}
