import * as React from 'react';

const dateAbout = () => {
  let date, weekday: any[], dayPeriods, currentTime;

  date = new Date();
  currentTime = date.getHours();

  weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayPeriods = currentTime < 12 ? 'morning' : currentTime < 18 ? 'afternoon' : 'evening';

  return {
    weekday: weekday[date.getDay()],
    dayPeriod: dayPeriods
  }
  
};

const date = dateAbout();

type Props = {
  lover: {
    one: string;
    two: string;
  }
  emoji: {
    name: string;
    unicode: string;
  }
}

export const LobbyHeader: React.FunctionComponent<Props> = (props) => {
    return <>
      <div className="header">
        <div className="content">
          <div className="hellolover">Hello, {props.lover.one}</div>
          <div className="emoji">{props.emoji.unicode}</div>
          <div className="quote">On a <strong>{date.weekday} {date.dayPeriod}</strong> it would be very interesting send a <em>"{props.emoji.name}"</em> emoji for {props.lover.two}</div>
        </div>
      </div>
    </>
};