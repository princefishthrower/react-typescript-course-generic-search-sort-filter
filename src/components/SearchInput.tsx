import * as React from "react";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import genericSearch from "../utils/genericSearch";
import PropsWithChildrenFunction from "../types/PropsWithChildrenFunction";

export interface ISearchInputProps<T> {
  dataSource: Array<T>;
  searchKeys: Array<keyof T>;
}

export function SearchInput<T>(
  props: PropsWithChildrenFunction<ISearchInputProps<T>, T>
) {
  const { searchKeys, dataSource, children } = props;
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <>
      <label htmlFor="search" className="mt-3">
        Search! Try me!
      </label>
      <input
        id="search"
        className="form-control full-width"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      {children &&
        dataSource
          .filter((person) =>
            genericSearch(person, searchKeys, searchQuery, false)
          )
          .map((widget) => children(widget))}
    </>
  );
}
