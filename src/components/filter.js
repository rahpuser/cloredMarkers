import React from 'react';
import Select from 'react-select';


function Filter({ filter, options, onChange, clearable }) {
  return (
    <div className="selectContainer">
      Filter list
      <Select
        name="filter"
        value={filter || options[0]}
        options={options}
        onChange={onChange}
        clearable={false}
      />
    </div>
  );
}

export default Filter;