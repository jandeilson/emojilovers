import * as React from "react";
import './style.scss';

import { PickEmojis } from "./components/frames/emojis/PickEmojis";
import { LobbyEmojis } from "./components/frames/emojis/lobby/LobbyEmojis";
import { Default } from "./components/frames/Default";

import { Footer } from "./components/layout/Footer";

type Props = {
  userData: any;
  loversData: (data: object) => void;
  pickedEmojis: (data: object) => void;
  loverPhone: (data: string) => void;
}

export class App extends React.Component<Props, object> {
  
  frame(n: number) {
    switch(n) {
      // Pick emojis frame
      case 1: 
        return <PickEmojis emojis={this.props.userData.emojis} pickedEmojis={this.props.pickedEmojis}/>;
      case 2:
        return <LobbyEmojis userData={this.props.userData} loverPhone={this.props.loverPhone}></LobbyEmojis>
      default:
       return <Default loversData={this.props.loversData}></Default>;
    }
  }

  render() {
    const frame = this.props.userData.configs.frame;

    return <>
    <section className="app">
      {this.frame(frame) /*frame here*/} 
    </section>
    {frame ? !frame : <Footer></Footer>}
    </>
  }
}