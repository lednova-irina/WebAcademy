import { monthsDictionary } from "../shared/month.dictionary.js";
import { EventsStore } from "../events/events.store.js";

export class MonthSchedule {
  constructor(day, event) {
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

    this.renderMonthSchedule();
    this.initControls();
  }

  get selectedDate() {
    return this.state.currentCalendarDate;
  }

  renderMonthSchedule() {
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
    const monthScheduleHeader = `${
      monthsDictionary[this.state.currentCalendarDate.getMonth()]
    } ${this.state.currentCalendarDate.getFullYear()}`;

    const headerEl = document.querySelector(".month_schedule-title");
    headerEl.innerHTML = monthScheduleHeader;
  }

  renderDate(date, container, className) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const ul = document.createElement("ul");
    const eventsList = this.getEventsListForDate(date);

    if (className) {
      li.classList.add(className);
    }

    li.appendChild(a);
    container.appendChild(li);
    li.appendChild(ul);

    ul.classList.add("month_schedule-day_events");

    eventsList.forEach((element) => {
      const li = document.createElement("li");
      ul.appendChild(li);

      const categoryClass = element.category;

      if (categoryClass == "noCategory") {
        li.classList.add("event-noCategory");
      } else if (categoryClass == "task") {
        li.classList.add("event-task");
      } else if (categoryClass == "reminder") {
        li.classList.add("event-reminder");
      } else if (categoryClass == "birthday") {
        li.classList.add("event-birthday");
      }

      const mDate = moment(element.startDate);
      li.innerHTML = `${mDate.format("HH:mm")} ${element.text}`;
    });

    a.innerHTML = date.getDate();
    a.setAttribute("href", `?day=${date.toJSON().split("T")[0]}`);

    if (
      this.state.currentCalendarDate &&
      this.compareDatesWithoutTime(this.state.currentCalendarDate, date)
    ) {
      li.classList.add("month_schedule_day-selected");
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

    const dateEl = document.querySelector(".month_schedule-days");
    dateEl.innerHTML = "";

    // get dates of the previous month
    for (let i = 0; i < this.state.daysOfPrevMonth.length; i++) {
      this.renderDate(this.state.daysOfPrevMonth[i], dateEl, "prev_month-day");
    }

    // get dates of the current month
    for (let i = 0; i < this.state.daysOfCurrentMonth.length; i++) {
      const day = this.state.daysOfCurrentMonth[i];
      if (day.getTime() === this.state.currentDate.getTime()) {
        this.renderDate(day, dateEl, "current_day");
      } else {
        this.renderDate(day, dateEl);
      }
    }

    // get dates of the next month
    for (let i = 0; i < this.state.daysOfNextMonth.length; i++) {
      this.renderDate(this.state.daysOfNextMonth[i], dateEl, "next_month-day");
    }
  }

  getEventsListForDate(date) {
    return EventsStore.Store.filter((el) => {
      return (
        el.startDate.getFullYear() === date.getFullYear() &&
        el.startDate.getMonth() === date.getMonth() &&
        el.startDate.getDate() === date.getDate()
      );
    });
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
    const prevButtonEl = document.querySelector(".month_schedule_btn-previous");
    const nextButtonEl = document.querySelector(".month_schedule_btn-next");

    prevButtonEl.onclick = function () {
      this.state.currentCalendarDate.setMonth(
        this.state.currentCalendarDate.getMonth() - 1
      );
      this.renderMonthSchedule();
    }.bind(this);

    nextButtonEl.onclick = function () {
      this.state.currentCalendarDate.setMonth(
        this.state.currentCalendarDate.getMonth() + 1
      );
      this.renderMonthSchedule();
    }.bind(this);
  }
}
