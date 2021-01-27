import * as React from "react";
import IFilter from "../interfaces/IFilter";
import ISorter from "../interfaces/ISorter";
import PropsWithChildrenFunction from "../types/PropsWithChildrenFunction";
import genericFilter from "../utils/genericFilter";
import genericSearch from "../utils/genericSearch";
import genericSort from "../utils/genericSort";
import { Filters } from "./Filters";
import { SearchInput } from "./SearchInput";
import { Sorters } from "./Sorters";

export interface ISearchSortAndFilterProps<T> {
  title: string;
  dataSource: Array<T>;
  initialSearchQuery: string;
  searchProperties: Array<keyof T>;
  initialSortProperty: ISorter<T>;
  initialFilterProperties: Array<IFilter<T>>;
}

export interface ISearchSortAndFilterState<T> {
  searchQuery: string;
  sortProperty: ISorter<T>;
  filterProperties: Array<IFilter<T>>;
}

export function SearchSortAndFilter<T>(
  props: PropsWithChildrenFunction<ISearchSortAndFilterProps<T>, T>
) {
  const {
    title,
    dataSource,
    initialSearchQuery,
    searchProperties,
    initialSortProperty,
    initialFilterProperties,
    children,
  } = props;
  const [
    searchSortAndFilterState,
    setSearchSortAndFilterState,
  ] = React.useState<ISearchSortAndFilterState<T>>({
    searchQuery: initialSearchQuery,
    sortProperty: initialSortProperty,
    filterProperties: initialFilterProperties,
  });
  const {
    searchQuery,
    sortProperty,
    filterProperties,
  } = searchSortAndFilterState;
  return (
    <>
      <h2>{title}</h2>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={(searchQuery) =>
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            searchQuery,
          })
        }
      />
      <Sorters
        dataSource={dataSource}
        setSortProperty={(sortProperty) => {
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            sortProperty,
          });
        }}
      />
      <Filters
        dataSource={dataSource}
        filterProperties={filterProperties}
        setFilterProperties={(filterProperties) => {
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            filterProperties,
          });
        }}
      />
      {children &&
        dataSource
          .filter((a) =>
            genericSearch(a, searchProperties, searchQuery, false)
          )
          .sort((a, b) => genericSort(a, b, sortProperty))
          .filter((a) => genericFilter(a, filterProperties))
          .map((a) => children(a))}
    </>
  );
}
