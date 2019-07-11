import React from "react";
import Weather from "./Weather.js";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(l => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag" width="250" height="150" />
      <Weather location={country.capital} />
    </div>
  );
};

export default Country;
