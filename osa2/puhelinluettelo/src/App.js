import React, { useState, useEffect } from "react";
import Persons from "./components/Persons.js";
import Filter from "./components/Filter.js";
import Personform from "./components/Personform.js";
import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Enter name");
  const [newNumber, setNewNumber] = useState("Enter number");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons));
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

  const handleRemove = id => {
    const personToBeRemoved = persons.find(p => p.id === id);

    if (window.confirm(`You are removing ${personToBeRemoved.name}`)) {
      personService.remove(id);
      setPersons(persons.filter(p => p.id !== id));
    }
  };

  const addPerson = event => {
    event.preventDefault();

    const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} already exists, replace number?`)) {
        const modifiedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, modifiedPerson)
          .then(newPerson => {
            setPersons(
              persons.map(p => (p.id !== existingPerson.id ? p : newPerson))
            )
          });
      } else {
        // Do nothing
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };

      personService
      . create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNewName("");
          setNewNumber("");
      });
    }
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
      <Persons persons={persons} filter={filter} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
