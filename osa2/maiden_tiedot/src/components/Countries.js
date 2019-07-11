import React from "react";
import Country from "./Country.js";

const Countries = ({ countries, filter, handleClick }) => {
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
        <div key={country.name}>
          {country.name}
          <button onClick={() => handleClick(country.name)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
