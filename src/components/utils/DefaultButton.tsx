import * as React from "react";

type Props = {
    label: string;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DefaultButton: React.FunctionComponent<Props> = (props) => {
    return <button className="button is-primary" onClick={props.handleClick}>{props.label}</button>
}