import React, { useState } from "react";
import widgets from "./mock-data/widgets";
import people from "./mock-data/people";
import genericSearch from "./utils/genericSearch";
import { SearchInput } from "./components/SearchInput";
import genericSort from "./utils/genericSort";
import IWidget from "./interfaces/IWidget";
import ISorter from "./interfaces/ISorter";
import IPerson from "./interfaces/IPerson";
import { Sorters } from "./components/Sorters";
import { WidgetRenderer } from "./components/renderers/WidgetRenderer";
import { PeopleRenderer } from "./components/renderers/PeopleRenderer";
import genericFilter from "./utils/genericFilter";
import { Filters } from "./components/Filters";
import IFilter from "./interfaces/IFilter";
function App() {
  const [query, setQuery] = useState<string>("");
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const [widgetSortProperty, setWidgetSortProperty] = useState<
    ISorter<IWidget>
  >({ property: "title", isDescending: true });
  const [widgetFilterProperties, setWidgetFilterProperties] = useState<
    Array<IFilter<IWidget>>
  >([]);
  const [peopleSortProperty, setPeopleSortProperty] = useState<
    ISorter<IPerson>
  >({ property: "firstName", isDescending: true });
  const [peopleFilterProperties, setPeopleFilterProperties] = useState<
    Array<IFilter<IPerson>>
  >([]);
  const buttonText = showPeople ? "Show widgets" : "Show people";
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowPeople(!showPeople)}
      >
        {buttonText}
      </button>
      <SearchInput
        setSearchQuery={(query) => {
          setQuery(query);
        }}
      />
      {!showPeople && (
        <>
          <h2>Widgets:</h2>
          <Sorters
            setProperty={(propertyType) => {
              setWidgetSortProperty(propertyType);
            }}
            object={widgets[0]}
          />
          <br />
          <Filters
            object={widgets[0]}
            properties={widgetFilterProperties}
            onChangeFilter={(property) => {
              const propertyMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property
              );
              const fullMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property &&
                  widgetFilterProperty.isTruthySelected ===
                    property.isTruthySelected
              );
              if (fullMatch) {
                setWidgetFilterProperties(
                  widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  )
                );
              } else if (propertyMatch) {
                setWidgetFilterProperties([
                  ...widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  ),
                  property,
                ]);
              } else {
                setWidgetFilterProperties([
                  ...widgetFilterProperties,
                  property,
                ]);
              }
            }}
          />
          {widgets
            .filter((widget) =>
              genericSearch(widget, ["title", "description"], query, false)
            )
            .filter((widget) => genericFilter(widget, widgetFilterProperties))
            .sort((a, b) => genericSort(a, b, widgetSortProperty))
            .map((widget) => {
              return <WidgetRenderer {...widget} />;
            })}
        </>
      )}
      {showPeople && (
        <>
          <h2>People:</h2>
          <Sorters
            setProperty={(propertyType) => {
              setPeopleSortProperty(propertyType);
            }}
            object={people[0]}
          />
          <Filters
            object={people[0]}
            properties={peopleFilterProperties}
            onChangeFilter={(property) => {
              const propertyMatch = peopleFilterProperties.some(
                (peopleFilterProperty) =>
                  peopleFilterProperty.property === property.property
              );
              const fullMatch = peopleFilterProperties.some(
                (peopleFilterProperty) =>
                  peopleFilterProperty.property === property.property &&
                  peopleFilterProperty.isTruthySelected ===
                    property.isTruthySelected
              );
              if (fullMatch) {
                setPeopleFilterProperties(
                  peopleFilterProperties.filter(
                    (peopleFilterProperty) =>
                      peopleFilterProperty.property !== property.property
                  )
                );
              } else if (propertyMatch) {
                setPeopleFilterProperties([
                  ...peopleFilterProperties.filter(
                    (peopleFilterProperty) =>
                      peopleFilterProperty.property !== property.property
                  ),
                  property,
                ]);
              } else {
                setPeopleFilterProperties([
                  ...peopleFilterProperties,
                  property,
                ]);
              }}}
          />
          {people
            .filter((person) =>
              genericSearch(
                person,
                ["firstName", "lastName", "eyeColor"],
                query,
                false
              )
            )
            .filter((person) => genericFilter(person, peopleFilterProperties))
            .sort((a, b) => genericSort(a, b, peopleSortProperty))
            .map((person) => {
              return <PeopleRenderer {...person} />;
            })}
        </>
      )}
    </>
  );
}

export default App;
