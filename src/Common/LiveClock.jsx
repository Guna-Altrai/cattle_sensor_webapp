import React, { useState, useEffect } from "react";

const LiveClock = ({ isPaused }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timerID;
    if (!isPaused) {
      timerID = setInterval(() => {
        setDate(new Date());
      }, 1000);
    }

    return () => {
      if (timerID) {
        clearInterval(timerID);
      }
    };
  }, [isPaused]);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      style={{
        color: "black",
        fontSize: "14px",
        fontFamily: "monospace",
      }}
    >
      <div>{formatTime(date)}</div>
      <div>{formatDate(date)}</div>
    </div>
  );
};

export default LiveClock;
