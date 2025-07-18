class DateHelper {
  static getFormattedDate = (dateInput: Date | string) => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  static getFormattedTime = (
    startInput: Date | string,
    endInput: Date | string
  ) => {
    const start =
      startInput instanceof Date ? startInput : new Date(startInput);
    const end = endInput instanceof Date ? endInput : new Date(endInput);

    return `${start.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${end.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };
}

export default DateHelper;
