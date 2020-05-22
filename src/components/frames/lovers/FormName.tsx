import * as React from 'react';
import { DefaultButton } from "../../utils/DefaultButton";

type States = {
  userId: string | null;
}

type Props = {
  loversData: (data: object) => void;
};

export class FormName extends React.Component<Props, States> {

  state: States = {
    userId: localStorage.getItem('userId')
  }

  formSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      loverOne: { value: string };
      loverTwo: { value: string };
    };

    let data = {
      lovers: {
        one: target.loverOne.value, 
        two: target.loverTwo.value
      }, 
      frame: 1
    };

    this.props.loversData(data);
  };

  handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({userId: e.target.value})
  }

  handleUserClick = () => {
    if (this.state.userId !== null)
    localStorage.setItem('userId', this.state.userId);

    // TODO recognize if user not found
    this.props.loversData({userId: this.state.userId, frame: 2});
  }

  user() {
    if (localStorage.getItem('userId')) {
      return <>
        <h4>Your identification</h4>
        <div className="field">
          <div className="control">
            <input type="text" className="input" value={this.state.userId?.toString()} onChange={this.handleUser}  />
          </div>
        </div>
        <DefaultButton label="Enter your lobby" handleClick={this.handleUserClick}></DefaultButton>
      </>;
    }
    
    return <>
    <h4>What lovers names?</h4>
    <form onSubmit={this.formSubmit}>
      <div className="field">
        <div className="control">
          <input type="text" className="input" placeholder="Your name" name="loverOne" />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input type="text" className="input" placeholder="Lover name" name="loverTwo" />
        </div>
      </div>
      <DefaultButton label="Continue"></DefaultButton>
    </form>
    </>
  }

  render() {
    return this.user();
  };
};