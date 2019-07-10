import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries.js"
import Filter from "./components/Filter.js"
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data));
  });

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter handleChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} />
    </div>
  )
};

export default App;
