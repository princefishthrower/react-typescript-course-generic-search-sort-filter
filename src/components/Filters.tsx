import * as React from "react";
import IFilter from "../interfaces/IFilter";

export interface IFiltersProps<T> {
  dataSource: Array<T>;
  filterProperties: Array<IFilter<T>>;
  setFilterProperties(filterProperties: Array<IFilter<T>>): void;
}

export function Filters<T>(
  props: IFiltersProps<T>
) {
  const { dataSource, filterProperties, setFilterProperties } = props;
  const object = dataSource.length > 0 ? dataSource[0] : {};

  const onChangeFilter = (property: IFilter<T>) => {
    const propertyMatch = filterProperties.some(
      (filterProperty) => filterProperty.property === property.property
    );
    const fullMatch = filterProperties.some(
      (filterProperty) =>
        filterProperty.property === property.property &&
        filterProperty.isTruthySelected === property.isTruthySelected
    );
    if (fullMatch) {
      setFilterProperties(
        filterProperties.filter(
          (filterProperty) => filterProperty.property !== property.property
        )
      );
    } else if (propertyMatch) {
      setFilterProperties([
        ...filterProperties.filter(
          (filterProperty) => filterProperty.property !== property.property
        ),
        property,
      ]);
    } else {
      setFilterProperties([...filterProperties, property]);
    }
  };
  return (
    <>
      <div className="p-1 my-2">
        <label className="mt-3">Filters! Try us too!</label>
        <br />
        {Object.keys(object).map((key) => {
          return (
            <React.Fragment key={key}>
              <input
                type="checkbox"
                id={`${key}-true`}
                value={key}
                onChange={() =>
                  onChangeFilter({
                    property: key as any,
                    isTruthySelected: true,
                  })
                }
                checked={filterProperties.some(
                  (property) =>
                    property.property === key && property.isTruthySelected
                )}
                className="m-1 ml-3"
              />
              <label htmlFor={`${key}-true`}>'{key}' is truthy</label>
              <input
                type="checkbox"
                id={`${key}-false`}
                value={key}
                onChange={() =>
                  onChangeFilter({
                    property: key as any,
                    isTruthySelected: false,
                  })
                }
                checked={filterProperties.some(
                  (property) =>
                    property.property === key && !property.isTruthySelected
                )}
                className="m-1 ml-3"
              />
              <label htmlFor={`${key}-false`}>'{key}' is falsy</label>
              <br />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
