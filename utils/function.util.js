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
