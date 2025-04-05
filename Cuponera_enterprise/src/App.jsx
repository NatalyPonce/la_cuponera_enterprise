import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import Header from "./components/header/Header";
import ReclamarCupones from "./empleado/ReclamarCupones";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route path="/home" element={<HomePage/>}/>

          <Route path="/gestionEmpleado" element={<HomePage/>}/>
          <Route path="/redeem" element={<ReclamarCupones/>}/>

        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
