export type DateValue = {
  year: string;
  month: string;
  day: string;
};

export function toDate(value: DateValue): Date {
  return new Date(
    Number(value.year),
    Number(value.month) - 1,
    Number(value.day)
  );
}

export function isValidDate(value: DateValue): boolean {
  const date = toDate(value);

  return (
    date.getFullYear() === Number(value.year) &&
    date.getMonth() === Number(value.month) - 1 &&
    date.getDate() === Number(value.day)
  );
}

export function isEndAfterStart(
  start: DateValue,
  end: DateValue
): boolean {
  return toDate(end).getTime() > toDate(start).getTime();
}

export function validateDateRange(
  start: DateValue | null,
  end: DateValue | null,
  outside_error: boolean
): string | null {
  if (!start || !end) return "Wybierz obie daty";

  if (!isValidDate(start)) return "Niepoprawna data początku";
  if (!isValidDate(end)) return "Niepoprawna data końca";

  if (!isEndAfterStart(start, end))
    return "Data końca musi być późniejsza niż data początku";

  if (!outside_error) return "Nieprawidłowe dane płatności";

  return null;
}