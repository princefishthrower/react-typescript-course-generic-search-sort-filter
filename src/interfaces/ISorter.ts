export default interface ISorter<T> {
    property: Extract<keyof T, string | Date | number>;
    isDescending: boolean;
}