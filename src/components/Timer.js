import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moment from "moment";

function CountdownTimer() {
  let [seconds, setSeconds] = useState(3000);
  const calculateTimeLeft = seconds => {
    let timeLeft = {};
    const difference = +moment().add(seconds, "seconds") - +moment();

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      seconds--;
      setSeconds(seconds);
    }, 1000);
  });

  useEffect(() => {
    setTimeout(() => {
      //setsecss();
      setTimeLeft(calculateTimeLeft(seconds));
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      <h2>Timer</h2>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}

export default CountdownTimer;
