import * as React from "react";

export interface ISortersProps<T> {
  object: T;
  setProperty: (property: keyof T) => void;
}

export function Sorters<T>(props: ISortersProps<T>) {
  const { object, setProperty } = props;
  return (
    <>
      <label htmlFor="sorters" className="mt-3">
        Sorters! Try us too!
      </label>
      <select id="sorters" className="custom-select" onChange={(event) => {
          setProperty(event.target.value as any)
      }}>
        {Object.keys(object).map((key) => {
          return (
            <option key={key} value={key}>
              Sort by '{key}'!
            </option>
          );
        })}
      </select>
    </>
  );
}
