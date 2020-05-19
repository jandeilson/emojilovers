import * as React from 'react';
import { DefaultButton } from "../../utils/DefaultButton";

type Props = {
  loversData: (data: object) => void;
};

export class FormName extends React.Component<Props, object> {

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

  render() {
    return <>
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
  };
};