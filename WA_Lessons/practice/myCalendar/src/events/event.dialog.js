import { Event } from "./event.js";
import { EventsStore } from "./events.store.js";

export class EventDialog {
  constructor(calendar, schedule) {
    this._schedule = schedule;
    this._calendar = calendar;
    this.startTime = $("#startTime");
    this.duration = $("#duration");
    this.text = $("#text");
    this.category = $("#category");

    this.dialog = $("#dialog-form").dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        Save: this.saveEvent,
        Cancel: () => {
          this.dialog.dialog("close");
        },
      },
      close: () => {
        this.form[0].reset();
      },
    });

    this.form = this.dialog.find("form").on("submit", (sysEvent) => {
      sysEvent.preventDefault();
      this.saveEvent();
    });

    this.category = $("#category").selectmenu();

    $("#add_event").on("click", () => {
      this.dialog.dialog("open");
    });
  }

  saveEvent = () => {
    const time = this.startTime.val().split(":");
    const dateToSave = new Date(
      this._calendar.selectedDate.getFullYear(),
      this._calendar.selectedDate.getMonth(),
      this._calendar.selectedDate.getDate(),
      time[0],
      time[1]
    );

    EventsStore.createEvent(
      new Event(
        dateToSave,
        this.duration.val(),
        this.text.val(),
        this.category.val()
      )
    );

    this._schedule.render();

    let isValid = true;
    if (isValid) {
      this.dialog.dialog("close");
    }
    return isValid;
  };
}
