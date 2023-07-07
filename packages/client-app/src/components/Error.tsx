import { Callout } from '@blueprintjs/core'

export interface ElErrorProps {
    error: string | Error;
    title?: string;
}

export function ElError(props: ElErrorProps) {
    const { error, title } = props
    const errorText = String(error);

    return (
        <Callout title={title}>
            {errorText}
        </Callout>
    )
}
