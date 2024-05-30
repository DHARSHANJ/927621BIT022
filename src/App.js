import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddPage from "./AddPage";
import EditPage from "./EditPage";
import ListPage from "./ListPage";
import LoginPage from "./LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addpage" element={<AddPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
