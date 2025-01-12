import React, { useState, useEffect } from "react";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  function LoadCategory() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }

  function LoadProducts() {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }

  useEffect(() => {
    LoadCategory();
    LoadProducts();
  }, []);

  return (
    <div className="App" style={{ fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f4f4f4",
        }}
      >
        <h1>Shopping Home</h1>
      </header>
      <section style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <nav
          style={{
            flex: "1",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <div>
            <label style={{ fontWeight: "bold" }}>Select Category</label>
            <div>
              <select
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </nav>
        <main
          style={{
            flex: "3",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                padding: "15px",
                backgroundColor: "#fff",
                textAlign: "center",
              }}
            >
              <img
                height="150" 
                src={product.image}
                alt=""
                style={{ borderRadius: "8px", width: "100px"}}
              />
              <div
                style={{
                  margin: "10px 0",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {product.title}
              </div>
              <div>
                <dl style={{ margin: "0", textAlign: "left" }}>
                  <dt style={{ fontWeight: "bold" }}>Price</dt>
                  <dd style={{ margin: "0 0 10px 0" }}>
                    ${product.price.toFixed(2)}
                  </dd>
                  <dt style={{ fontWeight: "bold" }}>Rating</dt>
                  <dd style={{ margin: "0" }}>
                    {product.rating.rate} ⭐ [{product.rating.count}]
                  </dd>
                </dl>
              </div>
            </div>
          ))}
        </main>
      </section>
    </div>
  );
}

export default App;
