import * as React from "react";
import { App } from "./App";

type States = {
    data: {
        lovers: {
            one: string;
            two: string;
        }
        emojis: {
            ids: any[];
        };
    },
    configs: {
        frame?: number;
        api?: {
            emojisLoaded?: boolean;
            error?: any;
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
  
        this.setState(prevState => ({
            data: {
                lovers: {
                    one: target.loverOne.value,
                    two: target.loverTwo.value 
                },
                emojis: prevState.data.emojis
            },
            configs: {
                frame: 1
            }
        }));
    };

    pickEmojis = (e: React.SyntheticEvent) => {

        e.preventDefault();
       
        let emojiId: number | undefined;
        
        const setState = (ids: any[]) => {
            this.setState(prevState => ({
                data: {
                    lovers: prevState.data.lovers,
                    emojis: {
                        ids: ids
                    }
                }
            }));
        }

        const id: string | null = e.currentTarget.getAttribute('data-id');
        
        if (id !== null) emojiId = parseFloat(id);
        
        const userEmojis: any[] | undefined = this.state.data.emojis?.ids;

        if (userEmojis !== undefined && emojiId !== undefined) 
            [...userEmojis].includes(emojiId) ? setState([...userEmojis.filter(id => id !== emojiId)]) : setState([...userEmojis || [], emojiId])
        else 
            setState([...userEmojis || [], emojiId]);
    };
 
    render() {
        return <App 
            formSubmit={this.formSubmit} // catch values data
            userData={this.state} // throw back a object data
            pickEmojis={this.pickEmojis}
        />
    }
}