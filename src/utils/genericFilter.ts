export default function genericFilter<T>(object: T, filterProperties: Array<keyof T>): boolean {

    return filterProperties.every(filterProperty => {
        return object[filterProperty] ? true : false;
    })
    
}