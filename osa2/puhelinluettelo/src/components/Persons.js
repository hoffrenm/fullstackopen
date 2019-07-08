import React from "react";
import Person from "./Person.js";

const Persons = ({ persons, filter }) =>
  persons
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Person key={person.name} person={person} />);

export default Persons;
