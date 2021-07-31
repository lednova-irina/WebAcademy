import { EventsStore } from "./events.store.js";

export class Event {
  constructor(startDate, endTime, text, category) {
    this.startDate = startDate;
    this.endTime = endTime;
    this.text = text;
    this.category = category;

    this.key = Event._uniqueKey;
    Event._uniqueKey++;
  }
  static _uniqueKey = 0;

  generateUIElement(currentDate) {
    const eventEl = document.createElement("div");
    eventEl.id = `event-${this.key}`;
    const renderStartTime = new Date(currentDate);
    const deleteButtonEl = document.createElement("button");
    const editButtonEl = document.createElement("button");

    renderStartTime.setHours(0);
    renderStartTime.setMinutes(0);
    renderStartTime.setSeconds(0);
    renderStartTime.setMilliseconds(0);

    const offsetTop = ((this.startDate - renderStartTime) / 60000) * 2;

    const duration = ((this.endTime - this.startDate) / 1000 / 60) * 2;

    eventEl.classList.add("schedule_view-events");
    eventEl.style.height = `${duration}px`;
    eventEl.style.top = `${offsetTop}px`;
    eventEl.appendChild(deleteButtonEl);
    // deleteButtonEl.innerHTML = "Delete";
    deleteButtonEl.classList.add("delete_button-event");
    eventEl.appendChild(editButtonEl);
    // editButtonEl.innerHTML = "Edit";
    editButtonEl.classList.add("edit_button-event");

    editButtonEl.onclick = () => {
      window.eventDialog.dialog.data("event", this).dialog("open");
    };

    deleteButtonEl.onclick = () => {
      this.removeFromUI();
      EventsStore.deleteEvent(this);
    };

    if (this.category == "finance") {
      eventEl.classList.add("schedule_view-event-finance");
    } else if (this.category == "management") {
      eventEl.classList.add("schedule_view-event-management");
    } else if (this.category == "design") {
      eventEl.classList.add("schedule_view-event-design");
    }
    eventEl.append(this.text);

    return eventEl;
  }
  removeFromUI() {
    const elToDelete = document.getElementById(`event-${this.key}`);
    elToDelete && elToDelete.remove();
  }
}
