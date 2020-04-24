import * as React from "react";

import { Lovers } from './components/lovers/Lovers';
import { LoversName } from './components/LoversName';

export class App extends React.Component {
    render() {
        return (
          <div>
          <LoversName />
          <Lovers message="teste" />
          </div>
        );
    }
}