import * as React from 'react';

type Props = {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  show: boolean;
}

type States = {

}

export class Modal extends React.Component<Props, States> {

    onClose = (e:React.MouseEvent<HTMLButtonElement>) => {
      this.props.onClose && this.props.onClose(e);
    };

    render() {
      if (!this.props.show) {
        return null;
      }
      
      return (
        <div className="modal" id="modal">
          <h2>Modal Window</h2>
          <div className="content">{this.props.children}</div>
          <div className="actions">
            <button className="toggle-button" onClick={this.onClose}>
              close
            </button>
          </div>
        </div>
      );
    };
};