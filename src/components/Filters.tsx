import * as React from "react";
import IFilter from "../interfaces/IFilter";

export interface IFiltersProps<T> {
  object: T;
  properties: Array<IFilter<T>>;
  onChangeFilter: (property: IFilter<T>) => void;
}

export function Filters<T>(props: IFiltersProps<T>) {
  const { object, properties, onChangeFilter } = props;
  return (
    <div className="p-1 my-2">
      <label className="mt-3">Filters! Try us too!</label>
      <br/>
      {Object.keys(object).map((key) => {
        return (
          <>
            <input
              type="checkbox"
              id={`${key}-true`}
              value={key}
              onChange={() => onChangeFilter({ property: key as any, isTruthySelected: true})}
              checked={properties.some(property => property.property === key && property.isTruthySelected)}
              className="m-1 ml-3"
            />
            <label htmlFor={`${key}-true`}>'{key}' is truthy</label>
            <input
              type="checkbox"
              id={`${key}-false`}
              value={key}
              onChange={() => onChangeFilter({ property: key as any, isTruthySelected: false})}
              checked={properties.some(property => property.property === key && !property.isTruthySelected)}
              className="m-1 ml-3"
            />
            <label htmlFor={`${key}-false`}>'{key}' is falsy</label>
            <br/>
          </>
        );
      })}
    </div>
  );
}
