import { Label } from "@blueprintjs/core";
import { ElementSize } from "./enum";

export interface ElLabelProps {
    children: string | null;
    placeholder?: string;
    size?: ElementSize;
    isDisabled?: boolean;
}

export const ElLabel = (props: ElLabelProps) => {
    const { size, children, placeholder, isDisabled } = props;
    
    const isLarge = size === ElementSize.LG;
    const className = isLarge ? 'bp5-text-large' : 'bp5-text-small'

    return (
        <Label
            className={className}
            placeholder={placeholder}
            disabled={isDisabled}
        >
            {children}
        </Label>
    );
}