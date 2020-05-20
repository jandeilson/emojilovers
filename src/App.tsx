import * as React from 'react';
import './style.scss';

// Frames
import { PickEmojis } from './components/frames/emojis/PickEmojis';
import { LobbyEmojis } from './components/frames/emojis/lobby/LobbyEmojis';
import { Default } from './components/frames/Default';

// Layout
import { Footer } from './components/layout/Footer';

// Hooks
import { A2HSInstallIOS } from './components/utils/A2HSInstallIOS';


type Props = {
  userData: any;
  loversData: (data: object) => void;
  pickedEmojis: (data: object) => void;
  loverPhone: (data: string) => void;
}

export class App extends React.Component<Props, object> {
  
  frame(n: number) {
    switch(n) {
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
    <A2HSInstallIOS />

    <section className="app">
      {this.frame(frame)} 
    </section>
    
    {frame ? !frame : <Footer></Footer>}
    </>
  }
}