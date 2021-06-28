function Calendar() {
  const currentDateTime = new Date();

  this.months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  this.state = {
    currentCalendarDate: new Date(),
    currentDate: new Date(
      currentDateTime.getFullYear(),
      currentDateTime.getMonth(),
      currentDateTime.getDate()
    ),
    daysOfCurrentMonth: [],
    daysOfPrevMonth: [],
    daysOfNextMonth: [],
  };

  this.renderCalendar();
  this.initControls();
}

Calendar.prototype.renderCalendar = function () {
  this.calculateDaysOfCurrentMonth();
  this.calculateDaysOfNextMonth();
  this.calculateDaysOfPrevMonth();
  this.renderDates();
  this.renderHeader();
};

Calendar.prototype.getAmountOfDaysForCurrentMonth = function () {
  return this.getDateOfCurrentMonth(0, 1).getDate();
};

Calendar.prototype.getFirstDayOfCurrentMonth = function () {
  return this.getDateOfCurrentMonth(1).getDay();
};

Calendar.prototype.getDateOfCurrentMonth = function (
  dayNumber,
  monthShift = 0
) {
  return new Date(
    this.state.currentCalendarDate.getFullYear(),
    this.state.currentCalendarDate.getMonth() + monthShift,
    dayNumber
  );
};

Calendar.prototype.renderHeader = function () {
  const calendarHeader = `${
    this.months[this.state.currentCalendarDate.getMonth()]
  } ${this.state.currentCalendarDate.getFullYear()}`;

  const headerEl = document.querySelector(".month_title");
  headerEl.innerHTML = calendarHeader;
};

Calendar.prototype.renderDate = function (date, container, className) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  if (className) {
    li.classList.add(className);
  }
  li.appendChild(a);
  container.appendChild(li);

  a.innerHTML = date.getDate();
  a.setAttribute("href", "#");
};

Calendar.prototype.renderDates = function () {
  // get needed amount of dates from the next month

  const dateEl = document.querySelector(".day_numbers");
  dateEl.innerHTML = "";

  // get dates of the previous month
  for (let i = 0; i < this.state.daysOfPrevMonth.length; i++) {
    this.renderDate(this.state.daysOfPrevMonth[i], dateEl, "prev_month-day");
  }

  // get dates of the current month
  for (let i = 0; i < this.state.daysOfCurrentMonth.length; i++) {
    const day = this.state.daysOfCurrentMonth[i];
    if (day.getTime() === this.state.currentDate.getTime()) {
      this.renderDate(day, dateEl, "day-current");
    } else {
      this.renderDate(day, dateEl);
    }
  }

  // get dates of the next month
  for (let i = 0; i < this.state.daysOfNextMonth.length; i++) {
    this.renderDate(this.state.daysOfNextMonth[i], dateEl, "next_month-day");
  }
};

Calendar.prototype.calculateDaysOfPrevMonth = function () {
  // get needed amount of dates from the prev month
  this.state.daysOfPrevMonth = [];

  const firstDayOfCurrentMonth = this.getFirstDayOfCurrentMonth();
  const startShift = (firstDayOfCurrentMonth + 6) % 7;
  const lastDayOfPrevMonth = this.getDateOfCurrentMonth(0).getDate();

  for (let j = startShift - 1; j >= 0; j--) {
    this.state.daysOfPrevMonth.push(
      this.getDateOfCurrentMonth(lastDayOfPrevMonth - j, -1)
    );
  }
};

Calendar.prototype.calculateDaysOfCurrentMonth = function () {
  // get needed amount of dates from the current month
  this.state.daysOfCurrentMonth = [];

  const amountOfDays = this.getAmountOfDaysForCurrentMonth();

  for (let i = 1; i <= amountOfDays; i++) {
    this.state.daysOfCurrentMonth.push(this.getDateOfCurrentMonth(i));
  }
};

Calendar.prototype.calculateDaysOfNextMonth = function () {
  // get needed amount of dates from the next month
  this.state.daysOfNextMonth = [];

  const amountOfDays = this.getAmountOfDaysForCurrentMonth();
  const firstDayOfCurrentMonth = this.getFirstDayOfCurrentMonth();
  const amountOfPrevDays = (firstDayOfCurrentMonth + 6) % 7;
  const amountOfNextDays = 42 - (amountOfDays + amountOfPrevDays);
  for (let j = 1; j <= amountOfNextDays; j++) {
    this.state.daysOfNextMonth.push(this.getDateOfCurrentMonth(j, 1));
  }
};

Calendar.prototype.initControls = function () {
  const prevButtonEl = document.querySelector(".month_button-previous");
  const nextButtonEl = document.querySelector(".month_button-next");

  prevButtonEl.onclick = function () {
    this.state.currentCalendarDate.setMonth(
      this.state.currentCalendarDate.getMonth() - 1
    );
    this.renderCalendar();
  }.bind(this);

  nextButtonEl.onclick = function () {
    this.state.currentCalendarDate.setMonth(
      this.state.currentCalendarDate.getMonth() + 1
    );
    this.renderCalendar();
  }.bind(this);
};

const calendar = new Calendar();
