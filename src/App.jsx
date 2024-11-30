import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
