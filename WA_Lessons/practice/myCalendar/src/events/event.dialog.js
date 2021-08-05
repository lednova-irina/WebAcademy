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
    this.tips = $(".validateTips");
    this.allFields = $([])
      .add(this.startTime)
      .add(this.endTime)
      .add(this.text)
      .add(this.category);

    this.dialog = $("#dialog-form").dialog({
      autoOpen: false,
      height: 470,
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
          this.startTime.val(
            existingEvent.startDate.toTimeString().substr(0, 5)
          );
          this.endTime.val(existingEvent.endTime.toTimeString().substr(0, 5));
          this.text.val(existingEvent.text);
          this.category.val(existingEvent.category); //!
        }
      },
    });

    this.form = this.dialog.find("form").on("submit", (sysEvent) => {
      sysEvent.preventDefault();
      this.saveEvent();
    });

    this.category = $("#category").selectmenu();
  }

  updateTips = (text) => {
    this.tips.text(text).addClass("ui-state-highlight");
    setTimeout(() => {
      this.tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  };

  checkLength = (input, inputName, min) => {
    if (input.val().length < min) {
      input.addClass("ui-state-error");
      this.updateTips(
        "'Length of " + inputName + " must be more then " + min + " symbols'"
      );
      return false;
    } else {
      return true;
    }
  };

  checkIsNotEmpty = (input, tip) => {
    if (input.val() == "") {
      input.addClass("ui-state-error");
      this.updateTips(tip);
      return false;
    } else {
      return true;
    }
  };

  checkRegexp = (input, regexp, tip) => {
    if (!regexp.test(input.val())) {
      input.addClass("ui-state-error");
      this.updateTips(tip);
      return false;
    } else {
      return true;
    }
  };

  updateTips = (tip) => {
    this.tips.text(tip).addClass("ui-state-highlight");
    setTimeout(() => {
      this.tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  };

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

    let isValid = true;
    this.allFields.removeClass("ui-state-error");

    isValid =
      isValid && this.checkIsNotEmpty(this.startTime, "'Start time is required'");
    isValid = isValid && this.checkLength(this.text, "Description", 5);
    isValid =
      isValid &&
      this.checkRegexp(
        this.text,
        /^[a-z]([0-9a-z_\s])+$/i,
        "'Description may consist of a-z, 0-9, underscores, spaces and must begin with a letter'"
      );

    if (isValid) {
      if (!isEditMode) {
        EventsStore.createEvent(event);
      } else {
        event.key = existingEvent.key;
        EventsStore.editEvent(event);
      }

      this.dialog.dialog("close");
      this._schedule.render();
    }

    return isValid;
  };
}
