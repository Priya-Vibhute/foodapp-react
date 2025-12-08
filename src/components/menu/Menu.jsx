import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../user/AuthContext";

function Menu() {
  const [menu, setMenu] = useState(null);
  const [categories, setCategories] = useState(null);

  const { token, user } = useContext(authContext);

  const fetchMenu = (choice, payload) => {
    if (choice) {
      switch (choice) {
        case "BETWEEN":
          fetch(
            `http://localhost:8080/product/search/findByPriceBetween?sp=${payload.sp}&ep=${payload.ep}`
          )
            .then((res) => res.json())
            .then((data) => setMenu(data._embedded.products))
            .catch((error) => console.log(error));
          break;
        case "SORT-BY-PRICE":
          if (payload.order == "ASC") {
            fetch("http://localhost:8080/product/search/findByOrderByPriceAsc")
              .then((res) => res.json())
              .then((data) => setMenu(data._embedded.products))
              .catch((error) => console.log(error));
          }

          if (payload.order == "DESC") {
            fetch("http://localhost:8080/product/search/findByOrderByPriceDesc")
              .then((res) => res.json())
              .then((data) => setMenu(data._embedded.products))
              .catch((error) => console.log(error));
          }
          break;
        default:
          console.log("Invalid argument given to fetchMenu");
      }
    } else {
      fetch("http://localhost:8080/products")
        .then((res) => res.json())
        .then((data) => setMenu(data));
    }
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

  const addToCart = (id) => {
    fetch(`http://localhost:8080/cart/${user.id}/add-to-cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
  };

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  return (
    <>
      {/* Categories */}

      <h5 onClick={() => fetchMenu()}>All menu</h5>
      <h5 onClick={() => fetchMenu("BETWEEN", { sp: 500, ep: 1000 })}>
        500-1000
      </h5>
      <h5 onClick={() => fetchMenu("BETWEEN", { sp: 1000, ep: 2000 })}>
        1000-2000
      </h5>
      <h5 onClick={() => fetchMenu("SORT-BY-PRICE", { order: "ASC" })}>
        Sort By price-low to high
      </h5>
      <h5 onClick={() => fetchMenu("SORT-BY-PRICE", { order: "DESC" })}>
        Sort By price-high to low
      </h5>

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
                  <p class="card-text">
                    Price {m.price} {m.id}
                  </p>
                  <button
                    className="btn btn-primary m-3"
                    onClick={() => addToCart(m.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Menu;
