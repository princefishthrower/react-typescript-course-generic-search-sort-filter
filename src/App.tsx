import React, { useState } from "react";
import widgets from "./mock-data/widgets";
import people from "./mock-data/people";
import genericSearch from "./utils/genericSearch";
import { SearchInput } from "./components/SearchInput";
import genericSort from "./utils/genericSort";
import IWidget from "./interfaces/IWidget";
import IProperty from "./interfaces/IProperty";
import IPerson from "./interfaces/IPerson";
import { Sorters } from "./components/Sorters";
import { WidgetRenderer } from "./components/renderers/WidgetRenderer";
import { PeopleRenderer } from "./components/renderers/PeopleRenderer";
import genericFilter from "./utils/genericFilter";
function App() {
  const [query, setQuery] = useState<string>("");
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const [widgetSortProperty, setWidgetSortProperty] = useState<
    IProperty<IWidget>
  >({ property: "title", isDescending: true });
  const [widgetFilterProperties, setWidgetFilterProperties] = useState<Array<keyof IWidget>>([]);
  const [peopleSortProperty, setPeopleSortProperty] = useState<
    IProperty<IPerson>
  >({ property: "firstName", isDescending: true });
  const [peopleFilterProperties, setPeopleFilterProperties] = useState<Array<keyof IPerson>>([]);
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
          {widgets
            .filter((widget) =>
              genericSearch(widget, ["title", "description"], query, false)
            )
            .filter((widget) =>
              genericFilter(widget, widgetFilterProperties)
            )
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
          {people
            .filter((person) =>
              genericSearch(
                person,
                ["firstName", "lastName", "eyeColor"],
                query,
                false
              )
            )
            .filter((person) =>
              genericFilter(person, peopleFilterProperties)
            )
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
