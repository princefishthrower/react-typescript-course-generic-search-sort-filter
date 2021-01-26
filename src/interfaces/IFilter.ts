export default interface IFilter<T> {
    property: keyof T;
    isTruthySelected: boolean;
}