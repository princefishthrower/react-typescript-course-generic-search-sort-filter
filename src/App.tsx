import React from 'react';
import widgets from './mock-data/widgets';
import people from './mock-data/people';
function App() {
  return (
    <>
      <h2>Widgets:</h2>
      {widgets.map(widget => {
        return (
          <h3>{widget.title}</h3>
        )
      })}
      <h2>People:</h2>
      {people.map(person => {
        return (
          <h3>{person.firstName} {person.lastName}</h3>
        )
      })}
    </>
  );
}

export default App;
