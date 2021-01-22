import React, { useState } from "react";
import widgets from "./mock-data/widgets";
import people from "./mock-data/people";
import genericSearch from "./utils/genericSearch";
import { SearchInput } from "./components/SearchInput";
function App() {
  const [query, setQuery] = useState<string>("");
  return (
    <>
      <SearchInput
        setSearchQuery={(query) => {
          setQuery(query);
        }}
      />
      <h2>Widgets:</h2>
      {widgets
        .filter((widget) =>
          genericSearch(widget, ["title", "description"], query, false)
        )
        .map((widget) => {
          return <h3>{widget.title}</h3>;
        })}
      <h2>People:</h2>
      {people
        .filter((person) =>
          genericSearch(
            person,
            ["firstName", "lastName", "eyeColor"],
            query,
            false
          )
        )
        .map((person) => {
          return (
            <h3>
              {person.firstName} {person.lastName}
            </h3>
          );
        })}
    </>
  );
}

export default App;
