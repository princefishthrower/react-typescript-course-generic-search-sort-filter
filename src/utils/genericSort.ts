import ISorter from "../interfaces/ISorter";

export default function genericSort<T>(a: T, b: T, propertyType: ISorter<T>) {
  const { property, isDescending } = propertyType;
  const result = () => {
    if (a[property] > b[property]) {
      return 1;
    }
    if (a[property] < b[property]) {
      return -1;
    }
    return 0;
  };
  return isDescending ? result() * -1 : result();
}
