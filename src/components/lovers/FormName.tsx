import * as React from "react";

type Props = {
    handleSubmit: (e: React.SyntheticEvent) => void;
}

export const FormName: React.FunctionComponent<Props> = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <input type="text" name="loverOne" />
        <input type="text" name="loverTwo" />
        <input type="submit" value="Continue" />
    </form>
    )
}
