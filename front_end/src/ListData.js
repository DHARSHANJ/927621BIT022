import React from "react";
import "./ListData.css"; // Import the CSS file

const ListData = ({ item, handleChange, handleDelete }) => {
  return (
    <li className="list-item">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => handleChange(item.id)}
        className="checkbox"
      />
      <span
        className={item.checked ? "item-checked" : "item-unchecked"}
        onClick={() => handleChange(item.id)}
      >
        {item.value}
      </span>
      <button onClick={() => handleDelete(item.id)} className="delete-button">
        Delete
      </button>
    </li>
  );
};

export default ListData;
