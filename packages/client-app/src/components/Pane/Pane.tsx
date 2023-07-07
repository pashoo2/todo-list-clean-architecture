import { PaneContainer } from "./PaneContainer"

export interface ElPaneProps {
    children: JSX.Element | JSX.Element[]
}

export const ElPane = (
    props: ElPaneProps
) => {
    return (
        <PaneContainer>
            {props.children}
        </PaneContainer>
    )
}
