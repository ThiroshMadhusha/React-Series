import React from "react";
import { useState } from "react";
import "./list.css";

import { FaTrashAlt } from "react-icons/fa";

const ListKey = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "Item1",
    },

    {
      id: 2,
      checked: false,
      item: "Item2",
    },
    {
      id: 3,
      checked: false,
      item: "Item3",
    },
  ]);

  const handleCheck = (id) => {
    // console.log(`key:${id}`);
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  return (
    <main>
      <ul>
        {items.map((item) => (
          // add key values
          <li className="item" key={item.id}>
            <input
              type="checkbox"
              onChange={() => handleCheck(item.id)}
              checked={item.checked}
            />
            <label
              // check box is true, label text is cut
              style={item.checked ? { textDecoration: "line-through" } : null}
              onDoubleClick={() => handleCheck(item.id)}
            >
              {item.item}
            </label>

            {/* Delete React Icon */}
            <FaTrashAlt role="button" tabIndex="0" />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ListKey;
