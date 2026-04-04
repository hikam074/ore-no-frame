export function formatTanggalIndo(dateString: string): string {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  const parts = formatter.formatToParts(date);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value || "";

  return `${capitalize(get("weekday"))}, ${get("day")} ${capitalize(
    get("month")
  )} ${get("year")} ${get("hour")}:${get("minute")}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}