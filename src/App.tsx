// style
import "./styles/global.style.scss";

// libraries
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// pages
import Home from "./pages/home/Home.page";
import Login from "./pages/login/Login.page";
import Masters from "./pages/masters/Masters.screen";
import Update from "./pages/update/Update.page";
import Users from "./pages/user/Users.page";

// components
import Navbar from "./components/navbar/Navbar.component";
import Footer from "./components/footer/Footer.component";
import Menu from "./components/menu/Menu.component";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <div className="outerContainer">
          <Navbar />
          <div className="container">
            <div className="menuContainer">
              <Menu />
            </div>
            <div className="contentContainer">
              <QueryClientProvider client={queryClient}>
                <Outlet />
              </QueryClientProvider>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "masters",
          element: <Masters />,
        },
        {
          path: "update/:id",
          element: <Update />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        // {
        //   path: "/users/:id",
        //   element: <User />,
        // },
        // {
        //   path: "/products/:id",
        //   element: <Product />,
        // },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
