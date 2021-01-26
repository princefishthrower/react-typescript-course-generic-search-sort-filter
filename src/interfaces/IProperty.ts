export default interface IProperty<T> {
    property: keyof T;
    isDescending: boolean;
}