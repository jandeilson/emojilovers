import * as React from 'react';
import { useIsIOS } from './hooks/A2HSIOS';
import { Modal } from './Modal';

export const A2HSInstallIOS: React.FunctionComponent<{}> = () => {

  const { prompt } = useIsIOS();
  const [show, modal] = React.useState(true);

  return <>
  {prompt && <Modal modalTitle="Install EmojiLovers!" onClose={() => modal(!show)} show={show}><p className="text-install-ios">Tap <div className="icon apple-share"></div> then "Add to Home Screen"</p></Modal>}
  </>
}