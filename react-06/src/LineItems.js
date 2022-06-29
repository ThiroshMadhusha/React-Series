import React from 'react'
import { FaTrashAlt } from "react-icons/fa";


const LineItems = ({item,handleCheck,handleDelete}) => {
  return (
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
      <FaTrashAlt
        // Delete items icon function
        onClick={() => handleDelete(item.id)}
        role="button"
              tabIndex="0"
              aria-label={`Delete ${item.item}`}
      />
    </li>
  );
}

export default LineItems