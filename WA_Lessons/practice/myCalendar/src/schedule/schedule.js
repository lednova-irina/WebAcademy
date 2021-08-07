import { EventsStore } from "../events/events.store.js";
import { monthsDictionary } from "../shared/month.dictionary.js";

export class Schedule {
  constructor(day) {
    const currentDate = new Date(day);
    this.state = {
      day,
      currentDate,
    };

    this.titleEl = document.querySelector(".schedule_view-title");
    this.render();
  }

  getCurrentId() {
    return this.state.day;
  }

  renderScheduleTitle() {
    const { currentDate } = this.state;
    const monthNum = currentDate.getMonth();
    const monthName = monthsDictionary[monthNum];

    const scheduleTitle = `${currentDate.getDate()} ${monthName} ${currentDate.getFullYear()}`;

    const titleEl = document.querySelector(".schedule_view-title");
    titleEl.innerHTML = scheduleTitle;
  }

  renderScheduleBody() {
    const rootEl = document.querySelector(".schedule_view-body");
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
      const descriptionEl = document.createElement("div");
      rootEl.appendChild(descriptionEl);
      descriptionEl.innerHTML = "";
      descriptionEl.classList.add("schedule_view-item");

      const timeEl = document.createElement("div");
      descriptionEl.appendChild(timeEl);
      timeEl.innerHTML = startShift[t];
      timeEl.classList.add("schedule_view-time");
    }
  }

  render() {
    this.renderScheduleTitle();
    this.renderScheduleBody();
    this.renderEvents();
  }

  renderEvents() {
    const eventEl = document.querySelector(".schedule_view-body");

    EventsStore.Store.filter((e) => {
      return (
        moment(e.startDate).isSame(this.state.currentDate, 'day')
      );
    }).forEach((e) => {
      e.removeFromUI();
      eventEl.appendChild(e.generateUIElement(this.state.currentDate));
    });
  }
}
