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

Calendar.prototype.renderHeader = function () {
  const calendarHeader = `${
    this.months[this.state.currentCalendarDate.getMonth()]
  } ${this.state.currentCalendarDate.getFullYear()}`;

  const headerEl = document.querySelector(".month_title");
  headerEl.innerHTML = calendarHeader;
};

Calendar.prototype.renderDates = function () {
  // get needed amount of dates from the next month

  const dateEl = document.querySelector(".day_numbers");
  dateEl.innerHTML = "";

  // get dates of the previous month
  for (let i = 0; i < this.state.daysOfPrevMonth.length; i++) {
    const day = this.state.daysOfPrevMonth[i];
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.appendChild(a);
    dateEl.appendChild(li);
    li.classList.add("prev_month-day");

    a.innerHTML = day.getDate();
    a.setAttribute("href", "#");
  }

  // get dates of the current month
  for (let i = 0; i < this.state.daysOfCurrentMonth.length; i++) {
    const day = this.state.daysOfCurrentMonth[i];
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.appendChild(a);
    dateEl.appendChild(li);

    a.innerHTML = day.getDate();
    a.setAttribute("href", "#");

    if (day.getTime() === this.state.currentDate.getTime()) {
      li.classList.add("day-current");
    }
  }

  // get dates of the next month
  for (let i = 0; i < this.state.daysOfNextMonth.length; i++) {
    const day = this.state.daysOfNextMonth[i];
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.appendChild(a);
    dateEl.appendChild(li);
    li.classList.add("next_month-day");

    a.innerHTML = day.getDate();
    a.setAttribute("href", "#");
  }
};

Calendar.prototype.calculateDaysOfPrevMonth = function () {
  // get needed amount of dates from the prev month
  this.state.daysOfPrevMonth = [];

  const firstDayOfCurrentMonth = new Date(
    this.state.currentCalendarDate.getFullYear(),
    this.state.currentCalendarDate.getMonth(),
    1
  ).getDay();
  const startShift = (firstDayOfCurrentMonth + 6) % 7;
  const lastDayOfPrevMonth = new Date(
    this.state.currentCalendarDate.getFullYear(),
    this.state.currentCalendarDate.getMonth(),
    0
  ).getDate();

  for (let j = startShift - 1; j >= 0; j--) {
    this.state.daysOfPrevMonth.push(
      new Date(
        this.state.currentCalendarDate.getFullYear(),
        this.state.currentCalendarDate.getMonth() - 1,
        lastDayOfPrevMonth - j
      )
    );
  }
};

Calendar.prototype.calculateDaysOfCurrentMonth = function () {
  // get needed amount of dates from the current month
  this.state.daysOfCurrentMonth = [];

  const amountOfDays = new Date(
    this.state.currentCalendarDate.getFullYear(),
    this.state.currentCalendarDate.getMonth() + 1,
    0
  ).getDate();

  for (let i = 1; i <= amountOfDays; i++) {
    this.state.daysOfCurrentMonth.push(
      new Date(
        this.state.currentCalendarDate.getFullYear(),
        this.state.currentCalendarDate.getMonth(),
        i
      )
    );
  }
};

Calendar.prototype.calculateDaysOfNextMonth = function () {
  // get needed amount of dates from the next month
  this.state.daysOfNextMonth = [];

  const amountOfCurrDays = new Date(
    this.state.currentCalendarDate.getFullYear(),
    this.state.currentCalendarDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfCurrentMonth = new Date(
    this.state.currentCalendarDate.getFullYear(),
    this.state.currentCalendarDate.getMonth(),
    1
  ).getDay();
  const amountOfPrevDays = (firstDayOfCurrentMonth + 6) % 7;

  const amountOfNextDays = 42 - (amountOfCurrDays + amountOfPrevDays);
  for (let j = 1; j <= amountOfNextDays; j++) {
    this.state.daysOfNextMonth.push(
      new Date(
        this.state.currentCalendarDate.getFullYear(),
        this.state.currentCalendarDate.getMonth() + 1,
        j
      )
    );
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
