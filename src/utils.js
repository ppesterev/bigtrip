import { TypeCategories } from "./const";

export function shuffleArray(originalArray) {
  let arr = originalArray.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomNFromArray(arr, count) {
  let shuffled = shuffleArray(arr);
  return shuffled.slice(0, count);
}

export function capitalize(str) {
  return str.slice(0, 1).toUpperCase().concat(str.slice(1));
}

export function getTypeCategory(type) {
  if (["check-in", "sightseeing", "restaurant"].includes(type)) {
    return TypeCategories.ACTIVITY;
  }
  return TypeCategories.TRANSPORT;
}
