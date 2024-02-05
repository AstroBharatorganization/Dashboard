// style
import "./styles/global.style.scss";

// libraries
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import Home from "./pages/home/Home.page";
import Login from "./pages/login/Login.page";
import Masters from "./pages/masters/Masters.screen";
import Update from "./pages/update/Update.page";
import Users from "./pages/user/Users.page";
import Wallet from "./pages/wallet/Wallet.page";
import Income from "./pages/income/Income.page";
import CallRecord from "./pages/callRecord/CallRecord.page";
import Banner from "./pages/banner/Banner.page";
import Queries from "./pages/queries/Queries.page";
import QueriesDetail from "./pages/queries/QueriesDetail.page";
import Reports from "./pages/report/Reports.page";
import Feedback from "./pages/feedback/Feedback.page";

// components
import Navbar from "./components/navbar/Navbar.component";

import Menu from "./components/menu/Menu.component";

import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { setAdmin } from "./features/authSlice.ts";

const queryClient = new QueryClient();

function App() {
  const dispatch = useAppDispatch();
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  useEffect(() => {
    dispatch(setAdmin(admin));
  }, []);
  const Layout = () => {
    return (
      <div className="app-container">
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
          {/* <Footer /> */}
        </div>
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

        {
          path: "/wallet",
          element: <Wallet />,
        },
        {
          path: "/income",
          element: <Income />,
        },
        {
          path: "/callRecord",
          element: <CallRecord />,
        },
        {
          path: "/banner",
          element: <Banner />,
        },
        {
          path: "/queries",
          element: <Queries />,
        },
        {
          path: "/queries/details/:id",
          element: <QueriesDetail />,
        },
        {
          path: "/reports",
          element: <Reports />,
        },
        {
          path: "/feedback",
          element: <Feedback />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
