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
      userId: string | null;
      emojisLoaded?: boolean;
      error?: any;
    };
  };
  emojis: any[]
};


export class AppController extends React.Component<object, States> {

  _isMounted = false;

  userId = localStorage.getItem('userId');

  state: States = {
      data: {
        lovers: { one: '', two: '' },
        emojis: { ids: [] }
      },
      configs: {
        frame: 0, // default frame
        api: { url: 'https://emojilovers.herokuapp.com/api', userId: this.userId, emojisLoaded: false, error: null, }
      },
      emojis: []
  };


  // Get user from api
  getUser() {
    fetch(this.state.configs.api.url + '/user/' + this.state.configs.api.userId)
      .then(res => res.json())
      .then(
        (data) => {
          if (data.error === 'User not found.') {
            alert('User not found.');

            this.setState(prevState => ({
              configs: { frame: 0, api: prevState.configs.api },
              emojis: prevState.emojis
            }));
          } else {
            if (this._isMounted) {
              this.setState(prevState => ({
                data: {
                  lovers: { one: data.user.lovers.one, two: data.user.lovers.two },
                  emojis: { ids: data.user.emojis.ids },
                  loverPhone: data.user.loverPhone
                },
                configs: { frame: data.configs.frame, api: prevState.configs.api },
                emojis: prevState.emojis
              }));
            }
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // Fetch emojis in the API
  componentDidMount() {
    this._isMounted = true;

    fetch(this.state.configs.api.url + '/emojis')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState(prevState => ({
            configs: { frame: prevState.configs.frame, api: { userId: this.userId, emojisLoaded: true, url: prevState.configs.api.url } },
            emojis: result
          }));
        },
        (error) => {
          this.setState({ configs: { api: { userId: this.userId, emojisLoaded: false, url: this.state.configs.api.url } } });
        }
      )

      if (this.state.configs.api.userId) 
      this.getUser();
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if(this.state.configs.api.userId !== prevState.configs.api.userId) {
      this.getUser();
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  };

  // Catch user and your lover name of the FormName component and set our controller data state
  loversData = (data: any) => {
    if (data.frame !== 2) { 
      // user registration
      this.setState(prevState => ({
        data: { 
          lovers: {one: data.lovers.one, two: data.lovers.two},
          emojis: prevState.data.emojis
        },
        configs: { frame: data.frame, api: prevState.configs.api }
      }));
    } else { 
      // user registered
      this.setState(prevState => ({
        data: { 
          lovers: prevState.data.lovers,
          emojis: prevState.data.emojis
        },
        configs: { frame: data.frame, api: { userId: data.userId, url: prevState.configs.api.url } }
      }));
    }
  };

  // Catch emoji ids of the PickedEmojis component and set our controller data state
  pickedEmojis = (data: any) => {
    this.setState(prevState => ({
      data: {
        lovers: prevState.data.lovers,
        emojis: { ids: data.ids }
      },
      configs: { frame: data.frame, api: prevState.configs.api }
    }));  
  };

  // Catch lover telphone of the LobbyEmojis component and set our controller data state
  loverPhone = (phone: string) => {
    this.setState(prevState => ({
      data: {
        lovers: prevState.data.lovers,
        emojis: prevState.data.emojis,
        loverPhone: phone
      },
      configs: prevState.configs
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