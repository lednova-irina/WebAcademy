import { monthsDictionary } from "../shared/month.dictionary.js";

export class Calendar {
  constructor(day) {
    const currentDateTime = new Date();

    this.state = {
      // выбранный день
      currentCalendarDate: new Date(),
      // текущая дата
      currentDate: new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate(),
        12
      ),
      daysOfCurrentMonth: [],
      daysOfPrevMonth: [],
      daysOfNextMonth: [],
    };

    if (day) {
      const [y, m, d] = day.split("-").map((s) => parseInt(s, 10));

      if (y > 0 && m > 0 && d > 0) {
        this.state.currentCalendarDate.setDate(d);
        this.state.currentCalendarDate.setMonth(m - 1);
        this.state.currentCalendarDate.setFullYear(y);
      }
    }

    this.renderCalendar();
    this.initControls();
  }

  get selectedDate() {
    return this.state.currentCalendarDate;
  }

  renderCalendar() {
    this.calculateDaysOfCurrentMonth();
    this.calculateDaysOfNextMonth();
    this.calculateDaysOfPrevMonth();
    this.renderDates();
    this.renderHeader();
  }

  getAmountOfDaysForCurrentMonth() {
    return this.getDateOfCurrentMonth(0, 1).getDate();
  }

  getFirstDayOfCurrentMonth() {
    return this.getDateOfCurrentMonth(1).getDay();
  }

  getDateOfCurrentMonth(dayNumber, monthShift = 0) {
    return new Date(
      this.state.currentCalendarDate.getFullYear(),
      this.state.currentCalendarDate.getMonth() + monthShift,
      dayNumber,
      12
    );
  }

  renderHeader() {
    const calendarHeader = `${
      monthsDictionary[this.state.currentCalendarDate.getMonth()]
    } ${this.state.currentCalendarDate.getFullYear()}`;

    const headerEl = document.querySelector(".month_title");
    headerEl.innerHTML = calendarHeader;
  }

  renderDate(date, container, className) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    if (className) {
      li.classList.add(className);
    }
    li.appendChild(a);
    container.appendChild(li);

    a.innerHTML = date.getDate();
    a.setAttribute("href", `?day=${date.toJSON().split("T")[0]}`);

    if (
      this.state.currentCalendarDate &&
      this.compareDatesWithoutTime(this.state.currentCalendarDate, date)
    ) {
      li.classList.add("day_selected");
    }
  }

  compareDatesWithoutTime(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  renderDates() {
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
  }

  calculateDaysOfPrevMonth() {
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
  }

  calculateDaysOfCurrentMonth() {
    // get needed amount of dates from the current month
    this.state.daysOfCurrentMonth = [];

    const amountOfDays = this.getAmountOfDaysForCurrentMonth();

    for (let i = 1; i <= amountOfDays; i++) {
      this.state.daysOfCurrentMonth.push(this.getDateOfCurrentMonth(i));
    }
  }

  calculateDaysOfNextMonth() {
    // get needed amount of dates from the next month
    this.state.daysOfNextMonth = [];

    const amountOfDays = this.getAmountOfDaysForCurrentMonth();
    const firstDayOfCurrentMonth = this.getFirstDayOfCurrentMonth();
    const amountOfPrevDays = (firstDayOfCurrentMonth + 6) % 7;
    const amountOfNextDays = 42 - (amountOfDays + amountOfPrevDays);
    for (let j = 1; j <= amountOfNextDays; j++) {
      this.state.daysOfNextMonth.push(this.getDateOfCurrentMonth(j, 1));
    }
  }

  initControls() {
    const prevButtonEl = document.querySelector(".month_button-previous");
    const nextButtonEl = document.querySelector(".month_button-next");
    const menuButtonEl = document.querySelector(".schedule_button-menu");

    menuButtonEl.onclick = function () {
      const monthSchedule = document.querySelector(".month_schedule-view");
      monthSchedule.classList.remove("hidden");

      const daySchedule = document.querySelector(".day_schedule_view");
      daySchedule.classList.add("hidden");

      const calendar = document.querySelector(".month_view");
      calendar.classList.add("hidden");
    }.bind(this);

    $("#add_event").on("click", () => window.eventDialog.dialog.dialog("open"));

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
  }
}
