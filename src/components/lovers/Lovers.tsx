import * as React from "react";

type MyProps = {
    message: string;
};
type MyState = {
    loverOne: string;
    loverTwo: string;
};

export class Lovers extends React.Component<MyProps, MyState> {
    state: MyState = {
      loverOne: 'Jandeilson',
      loverTwo: 'Priscila'
    };

    render() {
      return (
        <div>
          {this.props.message} {this.state.loverOne}
        </div>
      );
    }
  }