import React from "react";
import Person from "./Person.js";

const Persons = ({ persons, filter, handleRemove }) =>
  persons
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Person key={person.id} person={person} handleRemove={handleRemove}/>);

export default Persons;
