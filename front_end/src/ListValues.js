import React from "react";
import ListData from "./ListData";
const ListValues = ({ list, handleChange, handleDelete }) => {
  return (
    <ul>
      {list.map((item) => (
        <ListData
          key={item.id}
          item={item}
          handleChange={() => handleChange(item.id)}
          handleDelete={() => handleDelete(item.id)}
        />
      ))}
    </ul>
  );
};

export default ListValues;
