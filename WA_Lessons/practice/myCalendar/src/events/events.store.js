import { Event } from "./event.js";

export class EventsStore {
  static _storeKey = "store";
  static _store = null; // = [

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
  // ];

  static get Store() {
    if (EventsStore._store == null) {
      EventsStore._store = [];
      const localStore = JSON.parse(
        localStorage.getItem(EventsStore._storeKey)
      );
      if (localStore) {
        localStore.forEach((event) => {
          EventsStore._store.push(
            new Event(
              new Date(event.startDate),
              new Date(event.endTime),
              event.text,
              event.category
            )
          );
        });
      }
    }
    return EventsStore._store;
  }

  constructor() {}

  static createEvent(event) {
    EventsStore._store.push(
      new Event(event.startDate, event.endTime, event.text, event.category)
    );

    localStorage.setItem(
      EventsStore._storeKey,
      JSON.stringify(EventsStore._store)
    );
  }

  static editEvent(eventToEdit) {
    const indexEl = EventsStore._store.findIndex(
      (e) => eventToEdit.key == e.key
    );
    EventsStore._store[indexEl].startDate = eventToEdit.startDate;
    EventsStore._store[indexEl].endTime = eventToEdit.duration;
    EventsStore._store[indexEl].text = eventToEdit.text;
    EventsStore._store[indexEl].category = eventToEdit.category;

    localStorage.setItem(
      EventsStore._storeKey,
      JSON.stringify(EventsStore._store)
    );
  }

  static deleteEvent(eventToDelete) {
    EventsStore._store = EventsStore._store.filter(
      (e) => eventToDelete.key !== e.key
    );

    localStorage.setItem(
      EventsStore._storeKey,
      JSON.stringify(EventsStore._store)
    );
  }
}
