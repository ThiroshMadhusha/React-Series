import React from "react";
import "./assets/list.css";
import ItemList from "./ItemList";


const ListKey = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {/* All are delete empty message create with this length code */}
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        
      ) : (
        <p style={{ marginTop: "2rem" }}>Your List Is Empty</p>
      )}
    </main>
  );
};

export default ListKey;
