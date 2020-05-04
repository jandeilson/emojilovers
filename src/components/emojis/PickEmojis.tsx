import * as React from "react";

type Props = {
  emojis: [];
  pickEmojis: (e: React.SyntheticEvent) => void;
}

export class PickEmojis extends React.Component<Props, object> {
    render() {
      return <>
      {this.props.emojis.map((item: any, i: number) => {
        return (
        <div key={i} className="pick-emoji" data-id={item.id} onClick={this.props.pickEmojis}>
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
      </>
    }
}