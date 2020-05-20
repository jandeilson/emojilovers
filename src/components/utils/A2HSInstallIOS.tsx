import * as React from 'react';
import { useIsIOS } from './hooks/A2HSIOS';

export const A2HSInstallIOS: React.FunctionComponent<{}> = () => {

  const { prompt } = useIsIOS();
  
  return <>
  {prompt && <h1>Intall PWA iOS</h1>}
  </>
}