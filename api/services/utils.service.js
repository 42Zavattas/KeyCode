'use strict';

export function propsDiffer (one, two, arr) {
  if (!arr) { arr = Object.keys(two); }
  const len = arr.length;
  for (let i = 0; i < len; ++i) {
    if (one[arr[i]] !== two[arr[i]]) { return true; }
  }
  return false;
}
