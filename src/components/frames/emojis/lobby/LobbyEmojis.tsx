import * as React from 'react';
import { LobbyHeader } from './LobbyHeader';
import { Modal } from '../../../utils/Modal';

type Props = {
  userData: any;
}

type States = {
  showModal: boolean;
}

export class LobbyEmojis extends React.Component<Props, States> {
    state: States = {
      showModal: false
    };

    showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
      this.setState({
        showModal: !this.state.showModal
      });
    };

    render() {
      const userData = this.props.userData.data;
      const emojisData = this.props.userData.emojis;
      const userEmojis = this.props.userData.data.emojis.ids;
      let randomEmoji: any;

      emojisData.filter((emoji: any) => userEmojis.includes(emoji.id)).map((emoji: any, i: number, array: any[]) => {
        let keys: any = Object.keys(array);
        return randomEmoji = array[Math.round(Math.random() * keys.length << 0)];
      });
        
      return <>
      <section className="lobby-emojis">
        <div className="container is-fluid">
          <LobbyHeader emoji={{name: randomEmoji.name, unicode: randomEmoji.unicode}} lover={{one: userData.lovers.one, two: userData.lovers.two}}></LobbyHeader>
        </div>
        <div className="all-user-emojis">{emojisData.filter((emoji: any) => userEmojis.includes(emoji.id)).map((emoji: any, i: number) => {
          let position: string;

          (i % 2 === 0) ? position = 'left' : position = 'right';

          return (
          <div key={emoji.unicode} className={ `user-emoji ${position}` } data-id={emoji.id} >
            <div className="content">
              <div className="description">
                <p>{emoji.descriptions.default}</p>
              </div>
              <div className="circle">
                <div className="emoji">{emoji.unicode}</div>
              </div>
            </div>
          </div>
          )})}
        </div>
      </section>

      <Modal onClose={this.showModal} show={this.state.showModal}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
        deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
        fuga omnis a sed impedit explicabo accusantium nihil doloremque
        consequuntur.
      </Modal>
      </>
    };
};