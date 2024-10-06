import axios from "axios";
import { Container, Row } from "react-bootstrap";
import Navbar from "../src/components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Product from "./components/Product";
import { useState } from "react";
function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div>
        <Navbar onSearch={(term) => setSearchTerm(term)} />
        <Product searchTerm={searchTerm} />
      </div>
    </>
  );
}

export default App;
