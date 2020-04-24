import * as React from "react";

export interface ControllerProps { compiler: string; framework: string; }

export class Controller extends React.Component<ControllerProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}