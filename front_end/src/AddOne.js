import React from "react";
import "./AddOne.css"; // Import the CSS file
import { useRef } from "react";
const AddOne = ({ addNew, setAddNew, Addone }) => {
  const refer = useRef();
  return (
    <form onSubmit={(e) => Addone(e)} className="add-one-form">
      <input
        autoFocus
        ref={refer}
        type="text"
        placeholder="Add one"
        value={addNew}
        onChange={(e) => setAddNew(e.target.value)}
        className="add-one-input"
      />
      <button
        onClick={() => refer.current.focus()}
        aria-label="Add One"
        className="add-one-button"
      >
        Add
      </button>
    </form>
  );
};

export default AddOne;
