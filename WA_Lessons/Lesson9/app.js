function getDisplayedDate() {
  const params = new URLSearchParams(window.location.search);
  return params.get("day");
}

const displayedDate = getDisplayedDate();
const calendar = new Calendar(displayedDate);
const schedule = new Schedule(displayedDate);
