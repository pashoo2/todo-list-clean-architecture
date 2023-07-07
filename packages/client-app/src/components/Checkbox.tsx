import { Checkbox } from "@blueprintjs/core";


export interface ElCheckboxProps {
    value: boolean;
    onClick(): void;
}

export const ElCheckbox = (props: ElCheckboxProps) => {
    const { value, onClick } = props
    return <Checkbox checked={value} onChange={onClick} />
}