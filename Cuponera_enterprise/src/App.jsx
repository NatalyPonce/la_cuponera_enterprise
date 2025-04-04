import HomePage from "./components/Homepage";
import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <HomePage />
    </BrowserRouter>
  );
}

export default App;
