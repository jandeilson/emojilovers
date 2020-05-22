import * as React from 'react';

type Props = {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  show: boolean;
  modalTitle: string;
}

export class Modal extends React.Component<Props, {}> {

    onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      this.props.onClose && this.props.onClose(e);
    };

    render() {
      if (!this.props.show) {
        return null;
      }
      
      return (
        <div className="blackdrop-modal">
          <div className="modal" id="modal">
            <div className="header">
              <h2>{this.props.modalTitle}</h2>
              <button className="toggle-button" onClick={this.onClose}>x</button>
            </div>
            <div className="content">
              {this.props.children}
              </div>
          </div>
        </div>
      );
    };
};