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
    emojis: {
      ids: any[];
    };
    loverPhone?: string;
  },
  configs: {
    frame?: number;
    api: {
      url: string;
      emojisLoaded?: boolean;
      error?: any;
    };
  };
  emojis: any[]
};


export class AppController extends React.Component<object, States> {

  _isMounted = false;

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
          url: 'http://localhost:3000/api',
          emojisLoaded: false,
          error: null,
        }
      },
      emojis: []
  };

  // Fetch emojis in the API
  componentDidMount() {
    this._isMounted = true;
    const userId = localStorage.getItem('userId');

    fetch(this.state.configs.api.url + '/emojis')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState(prevState => ({
            configs: { frame: prevState.configs.frame, api: { emojisLoaded: true, url: prevState.configs.api.url } },
            emojis: result
          }));
        },
        (error) => {
          this.setState({ configs: { api: { emojisLoaded: false, url: this.state.configs.api.url } } });
        }
      )

      if (userId) {
        fetch(this.state.configs.api.url + '/user/' + localStorage.getItem('userId'))
          .then(res => res.json())
          .then(
            (data) => {
              if (this._isMounted) {
                this.setState(prevState => ({
                  data: {
                    lovers: { one: data.user.lovers.one, two: data.user.lovers.two },
                    emojis: { ids: data.user.emojis.ids },
                    loverPhone: data.user.loverPhone
                  },
                  configs: { frame: data.configs.frame, api: { url: prevState.configs.api.url } },
                  emojis: prevState.emojis
                }));
              }
            },
            (error) => {
              console.log(error);
            }
          )
      }

      
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Catch user and your lover name of the FormName component and set our controller data state
  loversData = (data: any) => {
    this.setState(prevState => ({
      data: { 
        lovers: { one: data.lovers.one, two: data.lovers.two },
        emojis: { ids: prevState.data.emojis.ids }
      },
      configs: { frame: data.frame, api: { url: prevState.configs.api.url }}
    }));
  };

  // Catch emoji ids of the PickedEmojis component and set our controller data state
  pickedEmojis = (data: any) => {
    this.setState(prevState => ({
      data: {
        lovers: { one: prevState.data.lovers.one, two: prevState.data.lovers.two },
        emojis: { ids: data.ids }
      },
      configs: { frame: data.frame, api: { url: prevState.configs.api.url } }
    }));  
  };

  // Catch lover telphone of the LobbyEmojis component and set our controller data state
  loverPhone = (phone: string) => {
    this.setState(prevState => ({
      data: {
        lovers: { one: prevState.data.lovers.one, two: prevState.data.lovers.two },
        emojis: { ids: prevState.data.emojis.ids },
        loverPhone: phone
      },
      configs: { frame: prevState.configs.frame, api: { url: prevState.configs.api.url } }
    })); 
  }

  render() {
    return <>
      <App 
        loversData={this.loversData} // Get values data
        userData={this.state} // Throw back this state data
        pickedEmojis={this.pickedEmojis} // Get emoji ids
        loverPhone={this.loverPhone}
      />
    </>
  }
}