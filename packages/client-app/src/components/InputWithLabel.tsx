import { FormGroup } from '@blueprintjs/core'

export interface ElInputWithLabelProps {
    input: JSX.Element;
    inputId: string;
    label: JSX.Element;
    hint?: JSX.Element
}

export const ElInputWithLabel = (
    props: ElInputWithLabelProps
): JSX.Element => {
    const { input, label, hint, inputId } = props
    return (
        <FormGroup
            label={label}
            labelFor={inputId}
            helperText={hint}
        >
            {input}
        </FormGroup>
    )
}

