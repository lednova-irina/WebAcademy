function createEvent(dateObj, duration, text, category) {
  return {
    startDate: dateObj.toJSON(),
    duration,
    text,
    category,
  };
}

const mySchedule = {
  "2021-05-09": [
    createEvent(
      new Date(2021, 5, 9, 9, 0, 0, 0),
      90,
      "Meet Sophia in airport",
      "finance"
    ),
    createEvent(
      new Date(2021, 5, 9, 11, 0, 0, 0),
      120,
      "Studio workshop",
      "management"
    ),
    createEvent(
      new Date(2021, 5, 9, 17, 30, 0, 0),
      150,
      "Design workshop with Johny",
      "management"
    ),
  ],
};
