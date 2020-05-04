import * as React from "react";
import './App.sass';

import { FormName } from './components/lovers/FormName';
import { PickEmojis } from "./components/emojis/PickEmojis";

type Props = {
  userData: any;
  formSubmit: (e: React.SyntheticEvent) => void;
  pickEmojis: (e: React.SyntheticEvent) => void;
}

export class App extends React.Component<Props, object> {
  
  frames(f: number) {
    switch(f) {
      case 1: // pick emojis frame
        return <PickEmojis emojis={this.props.userData.emojis} pickEmojis={this.props.pickEmojis}/>;
      default:
       return <FormName formSubmit={this.props.formSubmit} />;
      
    }
  }

  render() {
    const configs = this.props.userData.configs;

    return this.frames(configs.frame)
  }
}