function Schedule(day) {
  const currentDate = new Date(day);
  this.state = {
    day,
    currentDate,
  };

  this.titleEl = document.querySelector(".schedule_view-title");
  this.render();
}

Schedule.prototype.getCurrentId = function () {
  return this.state.day;
};

Schedule.prototype.getCurrentSchedule = function () {
  return mySchedule[this.getCurrentId()];
};

Schedule.prototype.renderScheduleTitle = function () {
  const { currentDate } = this.state;
  const monthNum = currentDate.getMonth();
  const monthName = monthsDictionary[monthNum];

  const scheduleTitle = `${currentDate.getDate()} ${monthName} ${currentDate.getFullYear()}`;

  const titleEl = document.querySelector(".schedule_view-title");
  titleEl.innerHTML = scheduleTitle;
};

Schedule.prototype.renderTime = function () {
  const timeEl = document.querySelector(".schedule_view-item");
  const startShift = [
    "00.00",
    "01.00",
    "02.00",
    "03.00",
    "04.00",
    "05.00",
    "06.00",
    "07.00",
    "08.00",
    "09.00",
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
    "16.00",
    "17.00",
    "18.00",
    "19.00",
    "20.00",
    "21.00",
    "22.00",
    "23.00",
  ];
  for (let t = 0; t < startShift.length; t++) {
    const div1 = document.createElement("div");
    timeEl.appendChild(div1);
    div1.innerHTML = startShift [t];
    div1.classList.add("schedule_view-time");

    const div2 = document.createElement("div");
    timeEl.appendChild(div2);
    div2.innerHTML ='';
    div2.classList.add("schedule_view-description");
  }
};

Schedule.prototype.render = function () {
  const currentSchedule = this.getCurrentSchedule();

  this.renderScheduleTitle();
  this.renderTime();
};
