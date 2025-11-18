import React, { useEffect, useState } from "react";

function Menu() {
  const [menu, setMenu] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchMenu = () => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  };

  const fetchCategories = () => {
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data["_embedded"]["categories"]));
  };

  const fetchProductByCategory = (link) => {
    fetch(link)
      .then((res) => res.json())
      .then((data) => setMenu(data._embedded.products));
  };

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  return (
    <>
      {/* Categories */}

      <h5 onClick={() => fetchMenu()}>All menu</h5>
      <div className="container">
        <div className="row">
          {categories &&
            categories.map((c) => (
              <div
                className="col"
                onClick={() => fetchProductByCategory(c._links.products.href)}
              >
                <p className="mx-3 my-2 p-3 category">{c.name}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Products */}
      <div class="row row-cols-1 row-cols-md-4 g-4">
        {menu &&
          menu.map((m) => (
            <div class="col">
              <div class="card">
                <img
                  src="https://cdn.dummyjson.com/recipe-images/1.webp"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">{m.name}</h5>
                  <p class="card-text">Price {m.price}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Menu;
