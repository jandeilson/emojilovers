import * as React from "react";
import './style.scss';

import { PickEmojis } from "./components/emojis/PickEmojis";

import { Default } from "./components/frames/Default";
import { Footer } from "./components/layout/Footer";


type Props = {
  userData: any;
  loversData: (ids: object) => void;
  pickedEmojis: (ids: any[]) => void;
}

export class App extends React.Component<Props, object> {
  
  frame(n: number) {
    switch(n) {
      // Pick emojis frame
      case 1: 
        return <PickEmojis emojis={this.props.userData.emojis} pickedEmojis={this.props.pickedEmojis}/>;
      default:
       return <Default loversData={this.props.loversData}></Default>;
    }
  }

  render() {
    const frame = this.props.userData.configs.frame;

    return <>
    <section className="app">
      {this.frame(frame)}
    </section>
    {!frame ? <Footer></Footer> : ''}
    </>
  }
}