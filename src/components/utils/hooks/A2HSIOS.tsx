import * as React from 'react';
import moment from 'moment';

function checkForIOS() {
  if (('standalone' in window.navigator) && (window.navigator['standalone'])) {
    return false;
  }

  const today: any = moment().format();
  const lastPrompt = moment(localStorage.getItem('installPrompt'));
  const days = moment(today).diff(lastPrompt, 'days');
  const ua = window.navigator.userAgent;
  const isIPad = !!ua.match(/iPad/i);
  const isIPhone = !!ua.match(/iPhone/i);
  const isIOS = isIPad || isIPhone;
  const webkit = !!ua.match(/WebKit/i);
  const isSafari = isIOS && webkit && !ua.match(/CriOS/i);

  const prompt = (isNaN(days) || days > 0) && isIOS;

  if (prompt && 'localStorage' in window) {
    localStorage.setItem('installPrompt', today);
  }

  return { isIPhone, isIPad, isIOS, isSafari, prompt };
}

export function useIsIOS() {
  const [isIOS, setIsIOS] = React.useState({} as any);

  React.useEffect(() => {
    setIsIOS(checkForIOS());
    return () => console.log('CLEANUP INSTALL PROMPT');
  }, []);

  return isIOS;
}
