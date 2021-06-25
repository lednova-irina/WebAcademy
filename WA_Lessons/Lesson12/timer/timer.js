function Timer({ autorun = false, controled = false }) {
  this.props = {
    autorun,
    controled,
  };

  this.state = {
    run: autorun,
    startTime: null,
    pauseTime: null,
  };

  this.creatBody();
}

Timer.prototype.start = function () {
  if (!this.state.run) {
    this.state.run = true;
    this.state.startTime = Date.now();
    this.state.pauseTime = null;

    this.__renderIntervalID = setInterval(this.render.bind(this), 10);
    this.render();
  }
};

Timer.prototype.pause = function () {
  if (this.state.run) {
    this.state.run = false;
    this.state.pauseTime = Date.now();

    if (this.__renderIntervalID) {
      clearInterval(this.__renderIntervalID);
    }
  }
};

Timer.prototype.reset = function () {
  this.pause();

  this.state.startTime = null;
  this.state.pauseTime = null;

  this.render();
};

Timer.prototype.creatBody = function () {
  this.timerBody = document.createElement("div");
  this.timerValue = document.createElement("span");
  this.actions = {
    start: document.createElement("button"),
    pause: document.createElement("button"),
    reset: document.createElement("button"),
  };

  this.timerBody.append(this.timerValue);
  this.actions.start.innerText = "Start";
  this.actions.pause.innerText = "Pause";
  this.actions.reset.innerText = "Reset";

  if (this.props.controled) {
    this.timerBody.append(
      this.actions.start,
      this.actions.pause,
      this.actions.reset
    );

    this.actions.start.addEventListener("click", this.start.bind(this));
    this.actions.pause.addEventListener("click", this.pause.bind(this));
    this.actions.reset.addEventListener("click", this.reset.bind(this));
  }
};

Timer.prototype.getCurrentTime = function () {
  const { run, pauseTime, startTime } = this.state;
  let displayTime = 0;

  if (!run && pauseTime && startTime) {
    displayTime = pauseTime - startTime;
  } else if (run && startTime) {
    displayTime = Date.now() - startTime;
  }

  return displayTime;
};

Timer.prototype.getCurrentTimeValue = function () {
  const ss = Math.floor(this.getCurrentTime() / 1000);
  const mm = Math.floor(ss / 60);
  const modSS = ss % 60;
  const ms = this.getCurrentTime() % 1000;

  return `${mm.toString().padStart(2, "0")}:${modSS
    .toString()
    .padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
};

Timer.prototype.render = function () {
  this.timerValue.innerText = this.getCurrentTimeValue();

  return this.timerBody;
};

const firstTimer = new Timer({ controled: true });
const firstTimerPlace = document.querySelector(".firstTimer");

firstTimerPlace.append(firstTimer.render());
firstTimer.start();

const secondTimer = new Timer({ controled: true });
const secondTimerPlace = document.querySelector(".secondTimer");

secondTimerPlace.append(secondTimer.render());
secondTimer.start();

