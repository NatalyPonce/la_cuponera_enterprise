import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import Header from "./components/header/Header";
import ReclamarCupones from "./empleado/ReclamarCupones";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/redeem" element={<ReclamarCupones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
