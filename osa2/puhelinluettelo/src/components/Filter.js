import React from "react";

const Filter = ({ handleChange, text }) => {
    return (
        <div>
            Filter list: <input value={text} onChange={handleChange} />
        </div>
    )
}

export default Filter;