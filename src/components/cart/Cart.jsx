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
      .then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
}

export default Cart;
