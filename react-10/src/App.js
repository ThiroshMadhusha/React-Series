import Footer from "./pages/Footer";
import Header from "./pages/Header";
import ListKey from "./pages/ListKey";
import { useState, useEffect } from "react";
import AddItem from "./pages/AddItem";
import SearchItem from "./pages/SearchItem";

function App() {
  const API_URL = " http://localhost:3500/items";

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist")) || []
  );
  // --------------------Add Form---------------------
  // New Add Items
  const [newItem, setNewItem] = useState("");
  // Search Bar
  const [search, setSearch] = useState("");

  // fetchError
  const [fetchError, setFetchError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // Add useEffect
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did Not Recieved Data");
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        // console.log(error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  console.log("after useEffect");

  // Add New Items
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  // --------------------End Add Form

  // Check box Items function
  const handleCheck = (id) => {
    // console.log(`key:${id}`);
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  // Delete Ckeckbox Items

  const handleDelete = (id) => {
    // console.log(id);
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
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

      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && (
          <p
            style={{
              color: "red",
            }}
          >{`Error :${fetchError}`}</p>
        )}
        {!fetchError && !isLoading && (
          <ListKey
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
