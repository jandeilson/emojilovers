import * as React from "react";
import { App } from "./App";

type States = {
    data: {
        lovers?: {
            one: string;
            two: string;
        }
        emojis?: {
            ids: any[];
        };
    },
    configs: {
        frame?: number;
        api?: {
            emojisLoaded: boolean;
            error?: any
        }
    }
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

    formSubmit = (e: React.SyntheticEvent) => {
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

    pickEmojis = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const id: string | null = e.currentTarget.getAttribute('data-id');

        let emojiId;

        if (id !== null) 
        emojiId = parseInt(id);
        
        const userEmojis: any[] | undefined = this.state.data.emojis?.ids;

        if (userEmojis !== undefined && userEmojis.includes(emojiId)) 
        return

        this.setState({
            data: {
                emojis: {
                    ids: [...userEmojis || [], emojiId]
                }
            }
        });
    };
 
    render() {
        return <App 
            formSubmit={this.formSubmit} // catch values data
            userData={this.state} // throw back a object data
            pickEmojis={this.pickEmojis}
        />
    }
}