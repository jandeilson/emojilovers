import * as React from 'react';
import { Modal } from '../utils/Modal';
import pkcg from '../../../package.json'

export const Footer: React.FunctionComponent<{}> = () => {

    const [about, modal] = React.useState(true);

    return <>
    <footer className="footer">
      <div className="content has-text-centered">
        <ul>
          <li><button onClick={() => modal(!about)}>About</button></li>
          <li>Feedback</li>
          <li>Privacy</li>
        </ul>
      
      made with love for my honey
      </div>
    </footer>

    <Modal modalTitle="About EmojiLovers" onClose={() => modal(!about)} show={!about}>
      <p>Version: {pkcg.version}</p>
      <p>More about soon.</p>
      <p>Thanks for testing! :)</p>
    </Modal>
  </>
}