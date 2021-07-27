import { Calendar } from "./calendar/calendar.js";
import { Schedule } from "./schedule/schedule.js";
import { EventDialog } from "./events/event.dialog.js";

function getDisplayedDate() {
  const params = new URLSearchParams(window.location.search);
  return params.get("day");
}

const displayedDate = getDisplayedDate();

const calendar = new Calendar(displayedDate);
const schedule = new Schedule(displayedDate);

const eventDialog = new EventDialog(calendar, schedule);
