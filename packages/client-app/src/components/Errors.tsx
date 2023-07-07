import { ElError } from "./Error";

export interface ElErrorsProps {
    errors?: Error[]
}

export const ElErrors = (props: ElErrorsProps) => {
    const {
        errors
    } = props

    if (!errors?.length) {
        return null;
    }

    return errors.map(error => {
        return <ElError key={error.message} error={error} />
    })
} 