import { useState, useEffect} from 'react';

function App() {
  const [power, setPower] = useState(false);
  const [session, setSession] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [displayTime, setDisplayTime] = useState(null);
  
  const displayFormatTime = (sec) => {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    )
  };

  const buttonFormatTime = (props) => {
    let minutes = Math.floor(props / 60);
    
    return (minutes)
  };

  const resetTime = () => {
    setPower(false);
    setSession(25 * 60);
    setBreakTime(5 * 60);

  }

  useEffect(() => {
    if (power) {
      const id = window.setInterval(() => {
        if (session <= 0) {
          setDisplayTime(breakTime);
          setBreakTime(s => s - 1);

          if (breakTime === 0) {
            resetTime();
          };

        } else if (session > 0) {
          setDisplayTime(session);
          setSession(s => s - 1);
        }
      }, 1000);

      return () => window.clearInterval(id);

    } else if (!power) {
      if (session <= 0) {
        setDisplayTime(breakTime);
      } else if (session > 0) {
        setDisplayTime(session);
      }
    }
  }, [power, session, breakTime, displayTime]);

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <h1>25 + 5</h1>
      <div className="display-time">
        <div className="timer">{displayFormatTime(displayTime)}</div>
        <div className="timer-buttons">
          <button className="fa fa-play fa-2x" disabled={power} onClick={() => setPower(true)}></button>
          <button className="fa fa-stop fa-2x" onClick={() => setPower(false)}></button>
          <button className="fa fa-refresh fa-2x" onClick={resetTime}></button>
        </div>
      </div>
      <div className="props-buttons">
        <div className="session-time">
          <h2>Session: {buttonFormatTime(session)}</h2>
          <button className="fa fa-minus fa-2x" disabled={(power || session === 60)} onClick={() => setSession(session - 60)}></button>
          <button className="fa fa-plus fa-2x" disabled={power} onClick={() => setSession(session + 60)}></button>
        </div>
        <div className="break-time">
          <h2>Break Time: {buttonFormatTime(breakTime)}</h2>
          <button className="fa fa-minus fa-2x" disabled={power || breakTime === 60} onClick={() => setBreakTime(breakTime - 60)}></button>
          <button className="fa fa-plus fa-2x" disabled={power} onClick={() => setBreakTime(breakTime + 60)}></button>
        </div>
      </div>
    </div>
  );
}

export default App;
