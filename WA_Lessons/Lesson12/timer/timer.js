function Timer({ autorun = false, controlled = false, selector = "" }) {
  this.props = {
    autorun,
    controlled,
    selector,
  };

  this.state = {
    run: false,
    startTime: null,
    pauseTime: null,
  };

  this.creatBody();
  this.render();

  if (this.props.autorun) {
    this.start();
  }  
}

Timer.prototype.start = function () {
  if (!this.state.run) {
    this.state.run = true;

    if (this.state.pauseTime) {
      this.state.startTime = new Date() - this.state.pauseTime;
    } else {
      this.state.startTime = new Date();
    }

    this.state.pauseTime = null;

    this.__renderIntervalID = setInterval(this.render.bind(this), 10);
  }
};

Timer.prototype.pause = function () {
  if (this.state.run) {
    this.state.run = false;
    this.state.pauseTime = new Date() - this.state.startTime;

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

  if (this.props.controlled) {
    this.timerBody.append(
      this.actions.start,
      this.actions.pause,
      this.actions.reset
    );

    this.actions.start.addEventListener("click", this.start.bind(this));
    this.actions.pause.addEventListener("click", this.pause.bind(this));
    this.actions.reset.addEventListener("click", this.reset.bind(this));
  }
  const timerPlace = document.querySelector(this.props.selector);
  timerPlace.append(this.timerBody);
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
};

new Timer({
  autorun: true,
  controlled: true,
  selector: ".firstTimer",
});

new Timer({ controlled: true, selector: ".secondTimer" });
