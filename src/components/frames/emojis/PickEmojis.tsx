import * as React from 'react';
import { DefaultButton } from "../../utils/DefaultButton";

type Props = {
  emojis: any[];
  pickedEmojis: (data: object) => void;
}

type States = {
  emojis: {
    ids: any[];
  },
  picked?: boolean;
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
      [...userEmojis].includes(emojiId) ? 
      setState([...userEmojis.filter(id => id !== emojiId)]) : 
      setState([...userEmojis || [], emojiId])
    else
      setState([...userEmojis || [], emojiId]);
    };

    // Throw picked emojis for the AppController state data
    pickedEmojis = () => { 
      this.props.pickedEmojis({ids: this.state.emojis.ids, frame: 2});
    };
    
    render() {
      return <>
      <section className="pick-emojis">
        <div className="container is-fluid has-text-centered">
          <h2>pick emojis you want!</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>

        {this.props.emojis.map((item: any, i: number) => {
          let position, picked;
          
          picked = this.state.emojis.ids.includes(item.id);

          (i % 2 === 0) ? position = 'left' : position = 'right';

          return (
          <div key={item.unicode} className={ `pick-emoji ${position} ${picked ? 'picked-' + position : 'unpicked'}` } data-id={item.id} onClick={this.pick}>
            <div className="content">
              <div className="description">
                <p>{item.descriptions.default}</p>
              </div>
              <div className="circle">
                <div className="emoji">{item.unicode}</div>
              </div>
            </div>
          </div>
          )})}

        <div className="container is-fluid has-text-centered">
          <DefaultButton handleClick={this.pickedEmojis} label="Start"></DefaultButton>
        </div>
      </section>
      </>
    };
};