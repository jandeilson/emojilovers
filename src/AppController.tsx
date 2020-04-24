import * as React from "react";
import { App } from "./App";


type States = {
    data: {
        lovers: {
            one: string;
            two: string;
        }
        emojis?: object;
    },
    configs: {
        frame?: number;
        api?: {
            emojisLoaded: boolean;
            error?: any
        }
    }
    emojis: []
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

    componentDidMount() {
        fetch("http://localhost:4000/emojis")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                configs: {
                    api: {
                        emojisLoaded: true,
                    },
                },
                emojis: result
              });
            },
            (error) => {
                this.setState({ configs: { api: { emojisLoaded: true, error } } });
            }
          )
    }

    handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
  
        const target = e.target as typeof e.target & {
            loverOne: { value: string };
            loverTwo: { value: string };
        };
  
        this.setState({
            data: {
                lovers: {
                    one: target.loverOne.value,
                    two: target.loverTwo.value 
                }
            },
            configs: {
                frame: 1
            }
        });
    };
 
    render() {
        return <App 
            handleSubmit={this.handleSubmit} // catch values data
            userData={this.state} // throw back a object data
        />
    }
}