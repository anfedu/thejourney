export function formatMoney(
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

export function formatString(str, max) {
  if (Object.keys(str).length > max) {
    return str.substring(0, max) + "...";
  } else {
    return str;
  }
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateFull(newDate) {
  const d = new Date(newDate);
  const date = d.getDate();
  const dayName = days[d.getDay()];
  const monthName = month[d.getMonth()];
  const year = d.getFullYear();

  return dayName + ", " + date + " " + monthName + " " + year;
}

export function formatDate(newDate) {
  const d = new Date(newDate);
  const date = d.getDate();
  const monthName = month[d.getMonth()];
  const year = d.getFullYear();

  return date + " " + monthName + " " + year;
}

export function dayName(newDate) {
  const d = new Date(newDate);
  const dayName = days[d.getDay()];

  return dayName;
}
