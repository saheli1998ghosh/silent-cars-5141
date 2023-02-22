import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import Navbar from "./components/Navbar";
import TopCategores from "./pages/TopCategores";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
     
    </div>
  );
}

export default App;
