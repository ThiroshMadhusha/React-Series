import Footer from "./pages/Footer";
import Header from "./pages/Header";
import ListKey from "./pages/ListKey";
import { useState, useEffect } from "react";
import AddItem from "./pages/AddItem";
import SearchItem from "./pages/SearchItem";

import apiRequest from "./pages/apiRequest";

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
    // READ CRUD Opeeration
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did Not Recieved Data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  // Add New Items
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    // API Create CRUD Operation
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };
  // --------------------End Add Form-----------------------------

  // Check box Items function
  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    // API Update CRUD Operation
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };
  // Delete Ckeckbox Items
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    // API Delete CRUD Operation
    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
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
