
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { helpers } from '../';
import './PomodoroTimer.css';


const Dots = () => {
  return (
    <div className="PomodoroTimer-dotsContainer">
      <div className="PomodoroTimer-dot"></div>
      <div className="PomodoroTimer-dot"></div>
    </div>
  )
}

const renderTime = (dimension, time) => {
  let wordArr = [];
  if (dimension === 'дней') {
    wordArr = ['дней', 'дня', 'день'];
  } else if (dimension === 'часов') {
    wordArr = ['часов', 'часа', 'час'];
  } else if (dimension === 'минут') {
    wordArr = ['минут', 'минуты', 'минута'];
  } else {
    wordArr = ['секунд', 'секунды', 'секунда'];
  }

  if (time === 1 || (time % 10 === 1)) {
    return (<div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{wordArr[2]}</div>
    </div>)
  } else if ((time >= 2 && time <= 4) || ((time % 10 >= 2 && time % 10 <= 4) && (time > 14 || time < 11))) {
    return (<div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{wordArr[1]}</div>
    </div>)
  } else {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  }
};



const PomodoroTimer = () => {

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: (helpers.useWindowWidth() < 750) ? 70 : 120,
    strokeWidth: 2
  };

  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = startTime + (604800 - (Date.now() - (new Date('February 19, 2024 00:00:00')).getTime()) / 1000) % 604800; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div className="PomodoroTimer">
      <CountdownCircleTimer
        {...timerProps}
        colors="var(--color-accent)"
        trailColor='var(--color-text-light)'
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime('дней', getTimeDays(daysDuration - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <Dots />
      <CountdownCircleTimer
        {...timerProps}
        colors="var(--color-accent)"
        trailColor='var(--color-text-light)'
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("часов", getTimeHours(daySeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <Dots />
      <CountdownCircleTimer
        {...timerProps}
        colors="var(--color-accent)"
        trailColor='var(--color-text-light)'
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("минут", getTimeMinutes(hourSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <Dots />
      <CountdownCircleTimer
        {...timerProps}
        colors="var(--color-accent)"
        trailColor='var(--color-text-light)'
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("секунд", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
}

export default PomodoroTimer