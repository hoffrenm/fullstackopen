import React, { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons.js";
import Filter from "./components/Filter.js";
import Personform from "./components/Personform.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Enter name");
  const [newNumber, setNewNumber] = useState("Enter number");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data));
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();

    if (persons.filter(p => p.name === newName).length > 0) {
      return alert(`${newName} has been already added to phonebook`);
    }

    const personObject = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleChange={handleFilterChange} />

      <h3>Add new person</h3>
      <Personform
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
