import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalTime: 1500,
      time: 1500,
      originalBreakTime: 300,
      break: false,
      active: false
    };

    this.timerFunc = this.timerFunc.bind(this);
    this.setTimerActive = this.setTimerActive.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  displayTimeCorrect(mins) {
    if (mins / 10 < 1) {
      return "0" + mins;
    }
    else {
      return mins;
    }
  }

  setTimerActive() {
    if (!this.state.active) {
      this.setState({
        active: true
      });
      this.timerFunc();
    }
  }

  timerFunc() {
    setTimeout(() => {
      if (this.state.active) {
        this.setState({
          time: this.state.time - 1
        });
        if (this.state.time > 0) {
          this.timerFunc();
        }
        else {
          if (!this.state.break) {
            this.setState({
              break: true,
              time: this.state.originalBreakTime
            });
            this.timerFunc();
          }
        }
      }
    }, 1000);
  }
  
  pauseTimer() {
    this.setState({
      active: false
    })
  }

  increment(type) {
    if (type === "break") {
      if (this.state.originalBreakTime < 3660) {
        this.setState({
          originalBreakTime: this.state.originalBreakTime + 60
        });
      }
    }
    else {
      if (this.state.originalTime < 3600) {
        this.setState({
          originalTime: this.state.originalTime + 60
        });
        setTimeout(() => this.reset(), 10)
      }
    }
  }

  decrement(type) {
    if (type === "break") {
      if (this.state.originalBreakTime > 60) {
        this.setState({
          originalBreakTime: this.state.originalBreakTime - 60
        });
      }
    }
    else {
      if (this.state.originalTime > 60) {
        this.setState({
          originalTime: this.state.originalTime - 60
        });
        setTimeout(() => this.reset(), 10)
      }
    }
  }

  reset() {
    this.pauseTimer();
    this.setState({
      time: this.state.originalTime,
      break: false
    });
  }

  render() {
    return (
      <div id="top-level-container">

        <div id="display">
          <div id="controls">
            <div id="break-controls" className="control-div">
              <h1 id="break-label">Break Length</h1>
              <div className="control-buttons-div">
                <a id="break-increment" onClick={() => this.increment("break")}><h1>+</h1></a>
                <h1 id="break-length">{this.state.originalBreakTime / 60}</h1>
                <a id="break-decrement" onClick={() => this.decrement("break")}><h1>-</h1></a>
              </div>
            </div>

            <div id="session-controls" className="control-div">
              <h1 id="session-label">Session Length</h1>
              <div className="control-buttons-div">
                <a id="session-increment" onClick={() => this.increment("session")}><h1>+</h1></a>
                <h1 id="session-length">{this.state.originalTime / 60}</h1>
                <a id="session-decrement" onClick={() => this.decrement("session")}><h1>-</h1></a>
              </div>
            </div>
          </div>

          <div id="clock-display">
            {this.state.break
            ? <h1 style={{color: "green", transition: "1s"}}id="timer">{this.displayTimeCorrect(Math.floor(this.state.time / 60)) + ":" + this.displayTimeCorrect(this.state.time % 60)}</h1>
            : <h1 style={{color: "red", transition: "1s"}}id="timer">{this.displayTimeCorrect(Math.floor(this.state.time / 60)) + ":" + this.displayTimeCorrect(this.state.time % 60)}</h1>
            }
            {/* <h1 id="timer">{Math.floor(this.state.time / 60) + ":" + this.displayMinsCorrect(this.state.time % 60)}</h1> */}
          </div>

          <div id="start-stop-reset-controls">
            <a onClick={this.setTimerActive}><i class="bi bi-play"></i></a>
            <a onClick={this.pauseTimer}><i class="bi bi-pause"></i></a>
            <a onClick={this.reset}><i class="bi bi-stop"></i></a>
          </div>

          <div>
            {this.state.break && this.state.active ? <h2 style={{color: "green"}}>Break time!</h2>
            : !this.state.break && this.state.active ? <h2 style={{color: "red"}}>Session in progress...</h2>
            : !this.state.break && !this.state.active ? <h2 style={{opacity: "0"}}>hidden</h2>
            : <h2 style={{color: "green"}}>Break time!</h2>
            }
          </div>
        </div>

      </div>
    );
  }
}

export default App;