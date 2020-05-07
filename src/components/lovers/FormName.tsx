import * as React from "react";

type Props = {
    formSubmit: (e: React.SyntheticEvent) => void;
}

export const FormName: React.FunctionComponent<Props> = (props) => {
    return (
    <form onSubmit={props.formSubmit}>
        <input type="text" name="loverOne" />
        <input type="text" name="loverTwo" />
        <input className="button is-primary" type="submit" value="Continue" />
    </form>
    )
}