import * as React from "react";
import { App } from "./App";

/* 
All states here are fundamental for the app logic works, 
I just figured out that this a good way to control important React states of all the app. 
*/
type States = {
  data: {
    lovers: {
      one: string;
      two: string;
    };
    emojis?: {
      ids: any[];
    };
  },
  configs: {
    frame?: number;
    api?: {
      emojisLoaded?: boolean;
      error?: any;
    };
  };
  emojis: any[]
};


export class AppController extends React.Component<object, States> {

  state: States = {
      data: {
        lovers: {
          one: '',
          two: ''
        },
        emojis: {
          ids: []
        }
      },
      configs: {
        frame: 0, // lovers name frame
        api: {
          emojisLoaded: false,
          error: null,
        }
      },
      emojis: []
  };

  // Fetch emojis in the API
  componentDidMount() {
    fetch("http://localhost:4000/emojis")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            configs: { api: { emojisLoaded: true, } },
            emojis: result
          });
        },
        (error) => {
          this.setState({ configs: { api: { emojisLoaded: true, error } } });
        }
      )
  };

  // Catch user and your lover name of the FormName component and set our controller data state
  loversData = (data: any) => {
    this.setState({
      data: { lovers: { one: data.lovers.one, two: data.lovers.two } },
      configs: { frame: data.frame }
    });
  };

  // Catch emoji ids of the PickedEmojis component and set our controller data state
  pickedEmojis = (ids: any[]) => {
    this.setState(prevState => ({
      data: {
        lovers: { one: prevState.data.lovers.one, two: prevState.data.lovers.two },
        emojis: { ids: ids } 
      }
    }));  
  };

  render() {
    return <>
      <App 
        loversData={this.loversData} // Get values data
        userData={this.state} // Throw back this state data
        pickedEmojis={this.pickedEmojis} // Get emoji ids
      />
    </>
  }
}