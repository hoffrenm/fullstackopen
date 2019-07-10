import React from "react";
import Country from "./Country.js";

const Countries = ({ countries, filter }) => {
  const filteredList = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredList.length > 10) {
    return <div>Too many matches, define search</div>;
  }

  if (filteredList.length === 1) {
    return <Country country={filteredList[0]} />;
  }

  return (
    <div>
      {filteredList.map(country => (
        <div key={country.name}>{country.name}</div>
      ))}
    </div>
  );
};

export default Countries;
