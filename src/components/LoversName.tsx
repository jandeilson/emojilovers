import * as React from "react";

type LoversState = {
    loverOne: string;
    loverTwo: string;
};

export class LoversName extends React.Component<{}, LoversState> {
    state: LoversState = {
      loverOne: '',
      loverTwo: ''
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        alert('A name was submitted: ' + this.state.loverOne + 'and' + this.state.loverTwo);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" name="loverOne" value={this.state.loverOne} onChange={this.handleInputChange.bind(this)}/>
                <input type="text" name="loverTwo" value={this.state.loverTwo} onChange={this.handleInputChange.bind(this)}/>

                <input type="submit" value="Continue" />
            </form>
        );
    }
  }