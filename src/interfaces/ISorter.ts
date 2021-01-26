export default interface ISorter<T> {
    property: keyof T;
    isDescending: boolean;
}