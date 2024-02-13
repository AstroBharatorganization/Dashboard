// style
import "./styles/global.style.scss";

// libraries
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import ProtectedRoute from "./config/protectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { persistor, store } from "./store/store";

import { PersistGate } from "redux-persist/integration/react";

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
import AstroQuery from "./pages/queries/AstroQueries.page";
import AstrologerState from "./pages/astrologerState/AstrologerState.page";

// components
import Navbar from "./components/navbar/Navbar.component";

import Menu from "./components/menu/Menu.component";

import SideBar from "./components/sidebar/SideBar.component";
import { Provider } from "react-redux";

// import { useAppDispatch } from "./store/hooks";
// import { useEffect } from "react";
// import { setAdmin } from "./features/authSlice.ts";

const queryClient = new QueryClient();

function App() {
  // const dispatch = useAppDispatch();
  // const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  // useEffect(() => {
  //   dispatch(setAdmin(admin));
  // }, [dispatch]);
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
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },

        {
          path: "masters",
          element: (
            <ProtectedRoute>
              <Masters />
            </ProtectedRoute>
          ),
        },
        {
          path: "update/:id",
          element: (
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          ),
        },
        {
          path: "/users",
          element: <Users />,
        },

        {
          path: "/wallet",
          element: (
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          ),
        },
        {
          path: "/income",
          element: (
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          ),
        },
        {
          path: "/callRecord",
          element: (
            <ProtectedRoute>
              <CallRecord />
            </ProtectedRoute>
          ),
        },
        {
          path: "/banner",
          element: (
            <ProtectedRoute>
              <Banner />
            </ProtectedRoute>
          ),
        },
        {
          path: "/queries",
          element: (
            <ProtectedRoute>
              <Queries />
            </ProtectedRoute>
          ),
        },
        {
          path: "/queries/details/:id",
          element: (
            <ProtectedRoute>
              <QueriesDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: "/astroQueries",
          element: (
            <ProtectedRoute>
              <AstroQuery />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reports",
          element: (
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          ),
        },
        {
          path: "/feedback",
          element: (
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          ),
        },
        {
          path: "/astrologerState",
          element: (
            <ProtectedRoute>
              <AstrologerState />
            </ProtectedRoute>
          ),
        },
        {
          path: "/side",
          element: <SideBar />,
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer position="top-right" autoClose={3000} />
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
