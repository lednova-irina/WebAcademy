import { Calendar } from "./calendar/calendar.js";
import { Schedule } from "./schedule/schedule.js";
import { EventDialog } from "./events/event.dialog.js";
import { MonthSchedule } from "./calendar/month.schedule.js";

function getDisplayedDate() {
  const params = new URLSearchParams(window.location.search);
  return params.get("day");
}

const displayedDate = getDisplayedDate();

const calendar = new Calendar(displayedDate);
const schedule = new Schedule(displayedDate);
const monthSchedule = new MonthSchedule(displayedDate);

window.eventDialog = new EventDialog(calendar, schedule);
