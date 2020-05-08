import * as React from 'react';
import { DefaultButton } from "../utils/DefaultButton";

type Props = {
  emojis: any[];
  pickedEmojis: (ids: any[]) => void;
}

type States = {
  emojis: {
    ids: any[];
  };
};

export class PickEmojis extends React.Component<Props, States> {

  state: States = {
    emojis: {
      ids: []
    }
  };

  pick = (e: React.SyntheticEvent) => {

    e.preventDefault();
   
    let emojiId: number | undefined;
    
    const setState = (ids: any[]) => {
      this.setState({
        emojis: {
          ids: ids
        }
      });
    };

    const id: string | null = e.currentTarget.getAttribute('data-id');
    
    if (id !== null) emojiId = parseFloat(id);
    
    const userEmojis: any[] | undefined = this.state.emojis.ids;

    if (userEmojis !== undefined && emojiId !== undefined) 
      [...userEmojis].includes(emojiId) ? setState([...userEmojis.filter(id => id !== emojiId)]) : setState([...userEmojis || [], emojiId])
    else 
      setState([...userEmojis || [], emojiId]);
    };

    // Throw picked emojis for the AppController state data
    pickedEmojis = () => { 
      this.props.pickedEmojis(this.state.emojis.ids);
    };
    
    render() {
      return <>
      {this.props.emojis.map((item: any, i: number) => {
        return (
        <div key={i} className="pick-emoji" data-id={item.id} onClick={this.pick}>
          <div className="content">
            <div className="description">
              {item.descriptions.default}
            </div>
            <div className="circle">
              <div className="emoji">{item.unicode}</div>
            </div>
          </div>
        </div>
      ) 
      })}

      <DefaultButton handleClick={this.pickedEmojis} label="Start"></DefaultButton>
      </>
    };
};