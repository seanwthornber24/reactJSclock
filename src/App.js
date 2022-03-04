import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalTime: 1500,
      time: 1500,
      active: true
    };

    this.timerFunc = this.timerFunc.bind(this);
  }

  displayMinsCorrect(mins) {
    if (mins / 10 < 1) {
      return "0" + mins;
    }
    else {
      return mins;
    }
  }

  timerFunc() {
    setTimeout(() => {
    this.setState({
      time: this.state.time - 1
    });
    if (this.state.time > 0) {
      this.timerFunc();
    }}, 1000)
  }

  render() {
    let x = 83;
    console.log(Math.floor(x / 60));
    console.log(x % 60);

    return (
      <div id="top-level-container">

        <div id="display">
          <div id="controls">
            <div id="break-controls" className="control-div">
              <h1 id="break-label">Break Length</h1>
              <div className="control-buttons-div">
                <a><h1>+</h1></a>
                <h1>5</h1>
                <a><h1>-</h1></a>
              </div>
            </div>

            <div id="session-controls" className="control-div">
              <h1 id="session-label">Session Length</h1>
              <div className="control-buttons-div">
                <a><h1>+</h1></a>
                <h1>25</h1>
                <a><h1>-</h1></a>
              </div>
            </div>
          </div>

          <div id="clock-display">
            <h1 id="timer">{Math.floor(this.state.time / 60) + ":" + this.displayMinsCorrect(this.state.time % 60)}</h1>
          </div>

          <div id="start-stop-reset-controls">
            <a onClick={this.timerFunc}><i class="bi bi-play"></i></a>
            <i class="bi bi-pause"></i>
            <i class="bi bi-stop"></i>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
