import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import defaultTheme from "./styles/theme";
import Homepage from "./pages/Homepage";
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import About from "./pages/About";
import ShopCakes from "./pages/ShopCakes";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import OrderUser from "./pages/OrderUser";

import QuoteNew from "./pages/QuoteNew";
import AdminOrdersPage from "./pages/AdminOrdersPage";


function App() {
  return (
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
              <Profile/>
              </Layout>
            }
          />
    <Route           
            path="/quote/new"
            element={
              <Layout>
              <QuoteNew/>
              </Layout>
            }
          />
    <Route           
            path="/orders"
            element={
              <Layout>
              <OrderUser/>
              </Layout>
            }
          />
    <Route           
            path="/admin/orders"
            element={
              <Layout>
              <AdminOrdersPage/>
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
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
