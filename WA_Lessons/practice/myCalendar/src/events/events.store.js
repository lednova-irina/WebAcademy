import { Event } from "./event.js";

export class EventsStore {
  static _store = [
    // new Event(
    //   new Date(2021, 5, 9, 9, 0, 0, 0),
    //   90,
    //   "Meet Sophia in airport",
    //   "finance"
    // ),
    // new Event(
    //   new Date(2021, 5, 9, 11, 0, 0, 0),
    //   120,
    //   "Studio workshop",
    //   "management"
    // ),
    // new Event(
    //   new Date(2021, 5, 9, 17, 30, 0, 0),
    //   150,
    //   "Design workshop with Johny",
    //   "management"
    // ),
  ];

  static get Store() {
    return EventsStore._store;
  }

  constructor() {}

 static createEvent(event) {
    EventsStore._store.push(
      new Event(event.startDate, event.duration, event.text, event.category)
    );
  }

  editEvent(eventToEdit) {
    const indexEl = EventsStore._store.findIndex(
      (e) => eventToEdit.key == e.key
    );
    EventsStore._store[indexEl].startDate = eventToEdit.startDate;
    EventsStore._store[indexEl].duration = eventToEdit.duration;
    EventsStore._store[indexEl].text = eventToEdit.text;
    EventsStore._store[indexEl].category = eventToEdit.category;
  }

  deleteEvent(eventToDelete) {
    EventsStore._store = EventsStore._store.filter(
      (e) => eventToDelete.key !== e.key
    );
  }
}


