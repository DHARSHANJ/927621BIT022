import React, { useEffect } from "react";
import { useState } from "react";
import ListValues from "./ListValues";
import AddOne from "./AddOne";

const ListItems = () => {
  const [addNew, setAddNew] = useState("");
  const API_URL = "http://localhost:3500/items";
  const [list, setList] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //use effect runs after the completion of all other codes.
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not Found");
        const ListItems = await response.json();
        setList(ListItems);
        setIsError(null);
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const handleChange = (key) => {
    const Listvalues = list.map((item) =>
      key === item.id ? { ...item, checked: !item.checked } : item
    );
    setList(Listvalues);
  };

  const handleDelete = (key) => {
    const ListValues = list.filter((item) => key !== item.id);
    setList(ListValues);
  };

  const Addone = (e) => {
    e.preventDefault();
    const id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
    const value = addNew;
    const ListValue = addNew
      ? [
          ...list,
          {
            id,
            checked: false,
            value,
          },
        ]
      : [...list];
    setList(ListValue);
    setAddNew("");
  };
  return (
    <>
      <AddOne addNew={addNew} setAddNew={setAddNew} Addone={Addone} />
      {isLoading && <label>Loading...</label>}
      {isError && <label>{`Error ${isError}`}</label>}
      {!isError && (
        <ListValues
          list={list}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default ListItems;
