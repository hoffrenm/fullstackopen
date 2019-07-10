import React from "react";

const Filter = ({ handleChange }) => {
  return (
    <div>
      Find countries by name: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
