import HomePage from "./components/homepage";
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
