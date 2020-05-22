import * as React from 'react';
import { LobbyHeader } from './LobbyHeader';
import { Modal } from '../../../utils/Modal';
import { DefaultButton } from '../../../utils/DefaultButton';
import '../../../../assets/styles/loverNumber.scss';

type Props = {
  userData: any;
  loverPhone: (data: string) => void;
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
      if (this.props.userData.data.loverPhone !== undefined) {
        this.setState({
          pickedEmoji: `${unicode} ${desc}`
        });

        setTimeout(() => {
          const urlData = `https://wa.me/${this.props.userData.data.loverPhone.replace(/\D/g,'')}?text=${this.state.pickedEmoji}`;
          window.open(urlData, '_blank') ||  window.location.assign(urlData);
        }, 2000);

      } else {
        this.setState({
          showModal: !this.state.showModal,
          pickedEmoji: `${unicode} ${desc}`
        });

        fetch(this.props.userData.configs.api.url + '/countryCodes')
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
        );
      }
    };

    userPhoneNumber = (e: React.SyntheticEvent) => {

      e.preventDefault();
    
      const target = e.target as typeof e.target & {
        countryCode: { value: string };
        phone: { value: string }
      };

      const phoneNumber = `${target.countryCode.value} ${target.phone.value}`;

      this.props.loverPhone(phoneNumber);

      this.setState(prevState => ({
        showModal: !this.state.showModal,
        randomEmoji: prevState.randomEmoji,
        userData: {
          phoneNumber: phoneNumber
        }
      }));

      fetch(this.props.userData.configs.api.url + '/user/update/' + localStorage.getItem('userId'), this.fetchOptions({loverPhone: phoneNumber}, 'PUT'))
        .then((res) => res.json())

      setTimeout(() => {
        const urlData = `https://wa.me/${phoneNumber.replace(/\D/g,'')}?text=${this.state.pickedEmoji}`;
        window.open(urlData, '_blank') || window.location.assign(urlData);
      }, 2000);
    }

    closeModal = () => {
      this.setState(prevState => ({
        showModal: !this.state.showModal,
        randomEmoji: prevState.randomEmoji
      }));
    }

    fetchOptions = (body: object, method: string) => {
      return {
        method: method,
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      }
    }

    componentWillMount() {
      const randomArr = this.props.userData.emojis.filter((emoji: any) => this.props.userData.data.emojis.ids.includes(emoji.id))
      const arrayKeys = Object.keys(randomArr);
      const randomEmoji = randomArr[Math.floor(Math.random() * arrayKeys.length << 0)]

      this.setState(prevState => ({
        showModal: prevState.showModal,
        randomEmoji: randomEmoji
      }));


      if (!localStorage.getItem('userId')) {
        // save user data on database
        fetch(this.props.userData.configs.api.url + '/user/catch', this.fetchOptions({user: this.props.userData.data, configs: {frame: 0}}, 'POST'))
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem('userId', data._id)
          })
          .catch((error) => console.log(error));
      }
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
        <h4>pick a emoji and have fun with {userData.lovers.two}</h4>
        <div className="all-user-emojis">{emojisData.filter((emoji: any) => userEmojis.includes(emoji.id)).map((emoji: any, i: number) => {
          let position: string, picked;

          if (this.state.pickedEmoji !== undefined)
          picked = this.state.pickedEmoji.includes(`${emoji.unicode} ${emoji.descriptions.default}`);

          (i % 2 === 0) ? position = 'left' : position = 'right';

          return (
          <div key={emoji.unicode} className={ `user-emoji ${position} ${picked ? 'picked' : 'unpicked'}` } data-id={emoji.id} onClick={(e) => this.getEmoji(e, emoji.unicode, emoji.descriptions.default)}>
            <div className="content">
              <div className="description">
                <p>{emoji.descriptions.default}</p>
              </div>
              <div className="circle">
                <span className="emoji">{emoji.unicode}</span>
              </div>
            </div>
          </div>
          )})}
        </div>

        <div className="line-bg"></div>
      </section>

      <Modal modalTitle={`Which ${userData.lovers.two}'s phone?`} onClose={this.closeModal} show={this.state.showModal}>
        <form onSubmit={this.userPhoneNumber} className="lover-number">
        <div className="field">
          <div className="control has-icons-left">
              <div className="select">
                <select name="countryCode" className="select" required>
                  <option selected disabled>Country</option>
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
            <input type="number" placeholder="Phone" className="input" name="phone" pattern="\d*" required />
          </div>
        </div>

        <input type="hidden" name="emojiInfo" value={this.state.pickedEmoji} />
        <DefaultButton label="Save number"></DefaultButton>
        </form>
      </Modal>
      </>
    };
};