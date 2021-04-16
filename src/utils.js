import { TypeCategory } from "./const";

export function capitalize(str) {
  return str.slice(0, 1).toUpperCase().concat(str.slice(1));
}

export function getTypeCategory(type) {
  if (["check-in", "sightseeing", "restaurant"].includes(type)) {
    return TypeCategory.ACTIVITY;
  }
  return TypeCategory.TRANSPORT;
}
