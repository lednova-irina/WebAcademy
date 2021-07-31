import { Event } from "./event.js";
import { EventsStore } from "./events.store.js";

export class EventDialog {
  constructor(calendar, schedule) {
    this._schedule = schedule;
    this._calendar = calendar;
    this.startTime = $("#startTime");
    this.endTime = $("#duration");
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
      open: () => {
        const existingEvent = $("#dialog-form").data("event");
        if (existingEvent) {
          this.startTime.val(existingEvent.startTime);
          this.endTime.val(existingEvent.endTime);
          this.text.val(existingEvent.text);
          this.category.val(existingEvent.category);
        }
      },
    });

    this.form = this.dialog.find("form").on("submit", (sysEvent) => {
      sysEvent.preventDefault();
      this.saveEvent();
    });

    this.category = $("#category").selectmenu();
  }

  saveEvent = () => {
    const sTime = this.startTime.val().split(":");
    const startEvent = new Date(
      this._calendar.selectedDate.getFullYear(),
      this._calendar.selectedDate.getMonth(),
      this._calendar.selectedDate.getDate(),
      sTime[0],
      sTime[1]
    );

    const eTime = this.endTime.val().split(":");
    const endEvent = new Date(
      this._calendar.selectedDate.getFullYear(),
      this._calendar.selectedDate.getMonth(),
      this._calendar.selectedDate.getDate(),
      eTime[0],
      eTime[1]
    );
    const existingEvent = $("#dialog-form").data("event");
    const isEditMode = !!existingEvent;
    const event = new Event(      
      startEvent,
      endEvent,
      this.text.val(),
      this.category.val()
    );
    if (!isEditMode) {
      EventsStore.createEvent(event);
    } else {
      event.key = existingEvent.key;
      EventsStore.editEvent(event);
    }

    this._schedule.render();

    let isValid = true;
    if (isValid) {
      this.dialog.dialog("close");
    }
    return isValid;
  };
}
