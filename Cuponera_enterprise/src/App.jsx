import HomePage from "./components/homepage";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
