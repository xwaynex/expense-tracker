import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

  if(loading) return null
  
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signUp"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={data?.authUser ? <TransactionPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
