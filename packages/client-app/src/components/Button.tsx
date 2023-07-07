import { AnchorButton, Button } from '@blueprintjs/core'
import { ElementSize } from "./enum";

export interface ElButtonProps {
    children: string | JSX.Element;
    link?: boolean;
    isDisabled?: boolean;
    size?: ElementSize;
    onClick(): void;
}

export const ElButton = (props: ElButtonProps) => {
    const { onClick, size, children, isDisabled, link } = props
    const btnProps = {
        disabled: isDisabled,
        onClick,
        children,
        small: size === ElementSize.SM,
        large: size === ElementSize.LG,
    }

    if (link) {
        return <AnchorButton minimal {...btnProps} />
    }
    return <Button {...btnProps} />
}
