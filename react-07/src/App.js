import Footer from "./pages/Footer";
import Header from "./pages/Header";
import ListKey from "./pages/ListKey";
import { useState } from "react";
import AddItem from "./pages/AddItem";
import SearchItem from "./pages/SearchItem";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist"))
  );

  // --------------------Add Form---------------------

  // New Add Items
  const [newItem, setNewItem] = useState("");

  // Search Bar
  const [search, setSearch] = useState("");

  // Save New Items
  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
  };

  // Add New Items
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  };

  // --------------------End Add Form

  // Check box Items function
  const handleCheck = (id) => {
    // console.log(`key:${id}`);
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSaveItems(listItems);
  };

  // Delete Ckeckbox Items

  const handleDelete = (id) => {
    // console.log(id);
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
  };

  // Handdle Submit function
  const handleSubmit = (e) => {
    // stop page reload using preventDefault
    e.preventDefault();
    if (!newItem) return;
    // console.log(newItem);

    // addItem
    addItem(newItem);
    setNewItem("");

    // console.log("submitted");
  };

  return (
    <div className="App">
      <Header />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />

      <ListKey
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
