import * as React from "react";
import { useState } from "react";
import ISorter from "../interfaces/ISorter";
import genericSort from "../utils/genericSort";
import PropsWithChildrenFunction from "../types/PropsWithChildrenFunction";

export interface ISortersProps<T> {
  dataSource: Array<T>;
  initialSortProperty: keyof T;
}

export function Sorters<T>(
  props: PropsWithChildrenFunction<ISortersProps<T>, T>
) {
  const { initialSortProperty, dataSource, children } = props;
  const [sortProperty, setSortProperty] = useState<ISorter<T>>({
    property: initialSortProperty,
    isDescending: true,
  });
  const object = dataSource.length > 0 ? dataSource[0] : {};
  return (
    <>
      <label htmlFor="sorters" className="mt-3">
        Sorters! Try us too!
      </label>
      <select
        id="sorters"
        className="custom-select"
        onChange={(event) => {
          const values = event.target.value.split("-");
          if (values.length === 2) {
            setSortProperty({
              property: values[0] as any,
              isDescending: values[1] === "true",
            });
          }
        }}
      >
        {Object.keys(object).map((key) => {
          return (
            <>
              <option key={`${key}-true`} value={`${key}-true`}>
                Sort by '{key}' descending!
              </option>
              <option key={`${key}-false`} value={`${key}-false`}>
                Sort by '{key}' ascending!
              </option>
            </>
          );
        })}
      </select>
      {children &&
        dataSource
          .sort((a, b) => genericSort(a, b, sortProperty))
          .map((widget) => children(widget))}
    </>
  );
}
