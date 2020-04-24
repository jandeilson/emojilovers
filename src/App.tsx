import * as React from "react";

import { FormName } from './components/lovers/FormName';
import { PickEmojis } from "./components/emojis/PickEmojis";

type Props = {
  userData: any;
  handleSubmit: (e: React.SyntheticEvent) => void;
}

export class App extends React.Component<Props, object> {
  
  frames(f: number) {
    switch(f) {
      case 1: // pick emojis frame
        return <PickEmojis />;
      default:
        return <FormName handleSubmit={this.props.handleSubmit} />;
    }
  }


  render() {
    const configs = this.props.userData.configs;

    return this.frames(configs.frame)
  }
}