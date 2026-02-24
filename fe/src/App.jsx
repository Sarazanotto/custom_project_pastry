import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { App as AntApp } from "antd";
import Homepage from "./pages/Homepage";
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import About from "./pages/About";
import ShopCakes from "./pages/ShopCakes";
import Contact from "./pages/Contact";
import ProfileUser from "./pages/ProfileUser";
import OrderUser from "./pages/OrderUser";
import QuoteNew from "./pages/QuoteNew";
import AdminOrders from "./pages/AdminOrders";
import AdminCakes from "./pages/AdminCakes";
import Success from "./pages/Success";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <AntApp>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route
              index
              path="/"
              element={
                <Layout>
                  <Homepage />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/cakes"
              element={
                <Layout>
                  <ShopCakes />
                </Layout>
              }
            />

            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <ProfileUser />
                </Layout>
              }
            />
            <Route
              path="/quote/new"
              element={
                <Layout>
                  <QuoteNew />
                </Layout>
              }
            />
            <Route
              path="/orders"
              element={
                <Layout>
                  <OrderUser />
                </Layout>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <Layout>
                  <AdminOrders />
                </Layout>
              }
            />
            <Route
              path="/admin/cakes"
              element={
                <Layout>
                  <AdminCakes />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/checkout"
              element={
                <Layout>
                  <Checkout />
                </Layout>
              }
            />
            <Route path="/success" element={<Success />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </AntApp>
  );
}

export default App;
