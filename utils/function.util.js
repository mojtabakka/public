export function isEmptyObject(data) {
  return !(isObject(data) ? Object.keys(data).length : false);
}

export function isObject(data) {
  return data !== null && typeof data === "object" && !isArray(data);
}

export const { isArray } = Array;
``