import * as React from "react";
import './App.sass';

import { FormName } from './components/lovers/FormName';
import { PickEmojis } from "./components/emojis/PickEmojis";

type Props = {
  userData: any;
  formSubmit: (e: React.SyntheticEvent) => void;
  pickedEmojis: (ids: any[]) => void;
}

export class App extends React.Component<Props, object> {
  
  frame(n: number) {
    switch(n) {
      // Pick emojis frame
      case 1: 
        return <PickEmojis emojis={this.props.userData.emojis} pickedEmojis={this.props.pickedEmojis}/>;
      default:
       return <FormName formSubmit={this.props.formSubmit} />;
    }
  }

  render() {
    return this.frame(this.props.userData.configs.frame)
  }
}