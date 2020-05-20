import * as React from 'react';
import { useIsIOS } from './hooks/iOSUser';

export const InstallIOSPWA: React.FunctionComponent<{}> = () => {

  const { prompt } = useIsIOS();
  
  return <>
  {prompt && <h1>Intall PWA iOS</h1>}
  </>
}