import logo from "./logo.svg";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import UserInfo from "./pages/UserInfo";
import TasksPage from "./pages/TasksPage";
import NotesPage from "./pages/NotesPage";
import ToolsPage from "./pages/ToolsPage";
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
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tools" element={<ToolsPage />} />
      </Routes>
    </>
  );
}

export default App;
