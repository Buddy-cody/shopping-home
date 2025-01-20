import React, { useState, useEffect } from "react";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  function LoadCategory() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        data.unshift("all")
        setCategories(data);
      });
  }

  function LoadProducts(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }

  function handleCategoryChange(e){
     let category = e.target.value;
     if (category === "all") {
       LoadProducts("https://fakestoreapi.com/products");
     } else {
       LoadProducts(
         `https://fakestoreapi.com/products/category/${e.target.value}`
       );
     }}

  useEffect(() => {
    LoadCategory();
    LoadProducts("https://fakestoreapi.com/products");

  }, []);

   useEffect(() => {
     let results = products.filter((product) =>
       product.title.toLowerCase().includes(search.toLowerCase())
     );

     setFilterProducts(results);
   }, [search, products]);

  const sortByPrice = (data) => {
    let productsDataCopy;
    if (data === "price") {
      if(filterProducts.length > 0){
        productsDataCopy = [...filterProducts];
         productsDataCopy.sort((a, b) => {
           return a.price - b.price;
         });
         setFilterProducts(productsDataCopy);
      }else{
        productsDataCopy = [...products];
       productsDataCopy.sort((a, b) => {
         return a.price - b.price;
       });
       setProducts(productsDataCopy);
      }
     
    } else if (data === "rating") {
       if(filterProducts.length > 0){
        productsDataCopy = [...filterProducts];
         productsDataCopy.sort((a, b) => {
           return b.rating.rate - a.rating.rate;
         });
         setFilterProducts(productsDataCopy);
        }else{
          productsDataCopy = [...products];
           productsDataCopy.sort((a, b) => {
             return b.rating.rate - a.rating.rate;
           });
           setProducts(productsDataCopy);
        }
     
    }
  };

  return (
    <div className="App" style={{ fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "red",
        }}
      >
        <h1
          style={{ flex: "1", textAlign: "start", color: "white", margin: "0" }}
        >
          Shopping Home
        </h1>
        <input
          type="search"
          placeholder="search here.."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{
            flex: "2",
            maxWidth: "300px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
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
                onChange={handleCategoryChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
              >
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <button
                style={{
                  marginRight: "2rem",
                  padding: "8px",
                  backgroundColor: "smoke",
                }}
                onClick={() => {
                  sortByPrice("price");
                }}
              >
                Price
              </button>
              <button
                style={{
                  marginRight: "2rem",
                  padding: "8px",
                  backgroundColor: "smoke",
                }}
                onClick={() => {
                  sortByPrice("rating");
                }}
              >
                Rating
              </button>
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
          {filterProducts.length > 0
            ? filterProducts.map((product, index) => (
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
                    style={{ borderRadius: "8px", width: "100px" }}
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
              ))
            : products.map((product, index) => (
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
                    style={{ borderRadius: "8px", width: "100px" }}
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
