import * as React from 'react';
import { LobbyHeader } from './LobbyHeader';
import { Modal } from '../../../utils/Modal';
import { DefaultButton } from '../../../utils/DefaultButton';
import '../../../../assets/styles/loverNumber.scss';

type Props = {
  userData: any;
}

type States = {
  showModal: boolean;
  randomEmoji: any;
  pickedEmoji?: string;
  country?: {
    codes: any,
    loaded: boolean
  },
  userData?: {
    phoneNumber: string
  }
}

export class LobbyEmojis extends React.Component<Props, States> {
    state: States = {
      showModal: false,
      randomEmoji: {}
    };

    getEmoji = (e: any, unicode?: string, desc?: string) => {
      this.setState({
        showModal: !this.state.showModal,
        pickedEmoji: `${unicode} ${desc}`
      });
      
      fetch("http://localhost:4000/countryCodes")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState(prevState => ({
            showModal: prevState.showModal,
            randomEmoji: prevState.randomEmoji,
            pickedEmoji: prevState.pickedEmoji,
            country: {
              codes: result,
              loaded: true
            }
          }));
        },
        (error) => {
          this.setState({ country: { codes: error, loaded: false } });
        }
      )

    };

    userPhoneNumber = (e: React.SyntheticEvent) => {
      e.preventDefault();
      
      const target = e.target as typeof e.target & {
        countryCode: { value: string };
        phone: { value: string }
      };

      const phoneNumber = `${target.countryCode.value} ${target.phone.value}`;

      this.setState(prevState => ({
        showModal: !this.state.showModal,
        randomEmoji: prevState.randomEmoji,
        userData: {
          phoneNumber: phoneNumber
        }
      }));
      
      window.location.href = `https://wa.me/${phoneNumber.replace(/\D/g,'')}?text=${this.state.pickedEmoji}`;
    }

    componentDidMount() {

      const randomArr = this.props.userData.emojis.filter((emoji: any) => this.props.userData.data.emojis.ids.includes(emoji.id))
      const arrayKeys = Object.keys(randomArr);
      const randomEmoji = randomArr[Math.floor(Math.random() * arrayKeys.length << 0)]

      this.setState(prevState => ({
        showModal: prevState.showModal,
        randomEmoji: randomEmoji
      }));

    };

    render() {
      let userData: any, emojisData: any[], userEmojis: any[];
      
      userData = this.props.userData.data;
      emojisData = this.props.userData.emojis;
      userEmojis = this.props.userData.data.emojis.ids;
      
      return <>
      <section className="lobby-emojis">
        <div className="container is-fluid">
          <LobbyHeader emoji={{name: this.state.randomEmoji.name, unicode: this.state.randomEmoji.unicode}} lover={{one: userData.lovers.one, two: userData.lovers.two}}></LobbyHeader>
        </div>
        <div className="all-user-emojis">{emojisData.filter((emoji: any) => userEmojis.includes(emoji.id)).map((emoji: any, i: number) => {
          let position: string;

          (i % 2 === 0) ? position = 'left' : position = 'right';

          return (
          <div key={emoji.unicode} className={ `user-emoji ${position}` } data-id={emoji.id} >
            <div className="content" onClick={(e) => this.getEmoji(e, emoji.unicode, emoji.descriptions.default)}>
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

      <Modal modalTitle={`Which ${userData.lovers.two}'s phone?`} onClose={this.getEmoji} show={this.state.showModal}>
        <form onSubmit={this.userPhoneNumber} className="lover-number">
        <div className="field">
          <div className="control has-icons-left">
              <div className="select">
                <select name="countryCode" className="select">
                  <option selected>Country</option>
                  {this.state.country?.codes.map((code: any, i: number) => {
                    return <option key={code.name} value={code.dial_code}>{code.name}</option>
                  })}
                </select>
              </div>
              <span className="icon globe is-left"></span>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input type="text" placeholder="Phone" className="input" name="phone" />
          </div>
        </div>

        <input type="hidden" name="emojiInfo" value={this.state.pickedEmoji} />
        <DefaultButton label="Save number"></DefaultButton>
        </form>
      </Modal>
      </>
    };
};