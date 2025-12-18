import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../user/AuthContext";

function Cart() {
  const { token, user } = useContext(authContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    fetch(`http://localhost:8080/cart/${user.id}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setCart(res));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div>
      <h1>Cart</h1>

      <div className="container m-3">
        {cart.map((p) => (
          <div>
            <h3>{p.name}</h3>
            <p>Price : {p.price}</p>
            <hr />
          </div>
        ))}

        <h1>Total is {totalAmount}</h1>
      </div>
    </div>
  );
}

export default Cart;
