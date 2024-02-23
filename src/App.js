import logo from "./logo.svg";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
