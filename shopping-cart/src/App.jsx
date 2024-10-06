import Navbar from "../src/components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Product from "./components/Product";
import { useState } from "react";
import Advantages from "./components/Advantages";
function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div>
        <Navbar onSearch={(term) => setSearchTerm(term)} />
        <Product searchTerm={searchTerm} />
        <Advantages />
      </div>
    </>
  );
}

export default App;
