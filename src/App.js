import logo from "./logo.svg";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import UserInfo from "./pages/UserInfo";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-info" element={<UserInfo />} />
      </Routes>
    </>
  );
}

export default App;
