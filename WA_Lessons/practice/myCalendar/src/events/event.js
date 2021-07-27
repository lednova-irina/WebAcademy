export class Event {
  constructor(startDate, duration, text, category) {
    this.startDate = startDate;
    this.duration = duration;
    this.text = text;
    this.category = category;

    this.key = Event._uniqueKey;
    Event._uniqueKey++;
  }
  static _uniqueKey = 0;

  generateUIElement() {
    const div = document.createElement("div");

    if (this.category == "finance") {
      div.classList.add("schedule_view-event-finance");
    } else if (this.category == "management") {
      div.classList.add("schedule_view-event-management");
    } else if (this.category == "design") {
      div.classList.add("schedule_view-event-design");
    }
    div.innerHTML = this.text;

    return div;

    // this.startDate.toJSON();
  }
}
