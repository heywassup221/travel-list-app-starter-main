import React, { useState } from "react";
import "./App.css"; 

function Logo() {
  return <h1 className="logo">My Travel List</h1>;
}

function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter a valid description.");
      return;
    }
    if (quantity <= 0) {
      alert("Please enter a positive quantity.");
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
      color: "#ffffff",
    };

    handleAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>What do you need to pack?</h3>
      <div className="form-group">
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="input-quantity"
        />
        <input
          type="text"
          name="description"
          placeholder="Enter item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-description"
        />
        <button type="submit" className="btn-add">
          Add
        </button>
      </div>
    </form>
  );
}

function Item({ item, handleDelete, handleTogglePacked, handleChangeColor }) {
  return (
    <li className="item">
      <div>
        <span className="item-description">{item.description}</span>{" "}
        <span className="item-quantity">(x{item.quantity})</span>
        <br />
        <small className="item-date">
          {new Date(item.id).toLocaleString()}
        </small>
      </div>
      <div className="item-actions">
        <input
          type="color"
          value={item.color}
          onChange={(e) => handleChangeColor(item.id, e.target.value)}
          className="color-picker"
        />
        <button onClick={() => handleTogglePacked(item.id)} className="btn-toggle">
          {item.packed ? "Unpack" : "Pack"}
        </button>
        <button onClick={() => handleDelete(item.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </li>
  );
}

function PackingList({ items, handleDelete, handleTogglePacked, handleChangeColor }) {
  return (
    <section className="packing-list">
      <h2>Your Packing List</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <Item
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              handleTogglePacked={handleTogglePacked}
              handleChangeColor={handleChangeColor}
            />
          ))}
        </ul>
      ) : (
        <p>No items added yet. Start packing by adding items above!</p>
      )}
    </section>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      {totalItems > 0 ? (
        <p>
          You have packed {packedItems} out of {totalItems} items ({packedPercentage}%).
        </p>
      ) : (
        <p>Your packing list is empty.</p>
      )}
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    const updatedItems = [item, ...items];
    setItems(updatedItems);
  }

  function handleDelete(itemId) {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  }

  function handleTogglePacked(itemId) {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );
    setItems(updatedItems);
  }

  function handleChangeColor(itemId, color) {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, color } : item
    );
    setItems(updatedItems);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handleTogglePacked={handleTogglePacked}
        handleChangeColor={handleChangeColor}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
