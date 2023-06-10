import moment from "moment-jalaali";
export function isEmptyObject(data) {
  return !(isObject(data) ? Object.keys(data).length : false);
}

export function isObject(data) {
  return data !== null && typeof data === "object" && !isArray(data);
}

export function isEmptyArray(data) {
  return !(isArray(data) ? data.length : false);
}

export const { isArray } = Array;
``;

export function isFunction(data) {
  return typeof data === "function";
}

export function addCommasSeprator(nStr) {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}
export function getToman(value) {
  return addCommasSeprator(Math.round(Number(value)));
}

export function convertMiladiDateToJalaliDate(date = new Date().toISOString()) {
  return moment(new Date().toISOString(), "YYYY-M-D ").format("jYYYY/jM/jD");
}

export function getMonthName(monthNumber) {
  const months = {
    1: "فروردین",
    2: "اردیبهشت",
    3: "خرداد",
    4: "تیر",
    5: "مرداد",
    6: "شهریور",
    7: "مهر ",
    7: "آبان",
    8: "آذر",
    10: "دی ",
    11: "بهمن",
    12: "اسفند",
  };

  return months[monthNumber];
}

export function groupBy(list, key) {
  const result = {};
  list.forEach((item) => {
    const changeResultToArray = Object.keys(result).map((key) => [
      key,
      result[key],
    ]);
    const findKey = changeResultToArray.find((data) => {
      return data[0] === item[key];
    });

    if (!findKey) {
      result[item[key]] = [item];
    } else {
      result[item[key]].push(item);
    }
  });
  return Object.keys(result).map((key) => {
    return { [key]: result[key] };
  });
}
