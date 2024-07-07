import { Route, Routes } from "react-router-dom";
import "./App.module.css";
import Layout from "../Layout/Layout";
import AppBar from "../AppBar/AppBar";
import { Suspense, lazy, useEffect } from "react";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <h3>Будь ласка, зачекайте, сторінка перезавантажуєтсья.</h3>
  ) : (
    <div>
      <Layout>
        <AppBar />
        <Suspense fallback={<Loader>loading</Loader>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<RestrictedRoute component={<RegistrationPage />} />}
            />
            <Route
              path="/login"
              element={<RestrictedRoute component={<LoginPage />} />}
            />
            <Route
              path="/contacts"
              element={<PrivateRoute component={<ContactsPage />} />}
            />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
