import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./components/Home";
import Menu from "./components/menu/Menu";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import { AuthProvider } from "./components/user/AuthContext";
import Cart from "./components/cart/Cart";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </>
  );
}

export default App;
