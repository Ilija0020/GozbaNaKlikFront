const getTodayName = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[new Date().getDay()];
};

export const weekDays = [
  {
    value: "Monday",
    label: "Ponedeljak",
  },
  {
    value: "Tuesday",
    label: "Utorak",
  },
  {
    value: "Wednesday",
    label: "Sreda",
  },
  {
    value: "Thursday",
    label: "Četvrtak",
  },
  {
    value: "Friday",
    label: "Petak",
  },
  {
    value: "Saturday",
    label: "Subota",
  },
  {
    value: "Sunday",
    label: "Nedelja",
  },
];

const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const formatTime = (time) => {
  return time.slice(0, 5);
};

export const getWorkingHoursText = (workingHours) => {
  if (!workingHours) {
    return "Zatvoreno";
  }

  const nextDayText = workingHours.endsNextDay ? " (sledeći dan)" : "";

  return `${formatTime(workingHours.startTime)}–${formatTime(workingHours.endTime)}${nextDayText}`;
};

export const getTodayWorkingHours = (workingHours) => {
  const today = getTodayName();

  return workingHours?.find((item) => item.day === today);
};

export const isTodayNonWorkingDay = (nonWorkingDays) => {
  const today = getTodayDate();

  return nonWorkingDays?.some((item) => item.date === today);
};

export const getTodayWorkingHoursText = (restaurant) => {
  if (isTodayNonWorkingDay(restaurant.nonWorkingDays)) {
    return "Danas: neradni dan";
  }

  const todayWorkingHours = getTodayWorkingHours(restaurant.workingHours);

  if (!todayWorkingHours) {
    return "Danas: zatvoreno";
  }

  const nextDayText = todayWorkingHours.endsNextDay ? " (posle ponoći)" : "";

  return `Danas: ${formatTime(
    todayWorkingHours.startTime,
  )}–${formatTime(todayWorkingHours.endTime)}${nextDayText}`;
};
