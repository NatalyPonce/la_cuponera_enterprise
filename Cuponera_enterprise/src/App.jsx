import HomePage from "./components/homepage";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginPage";
import ManageEmployessPage from "./components/ManageEmployessPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path ="/employees/" element={<ManageEmployessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
