import axios from "axios";
import { useEffect, useState } from "react";
import "../css/product.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "react-bootstrap";

function Product({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const getAxiosProduct = async () => {
        const response = await axios.get(
          `https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`
        );
        const data = await response.data.results;
        console.log(data);
        setProducts(data);
        setLoading(true);
        setError("");
      };
      getAxiosProduct();
    } catch (error) {
      console.error("API HATASI YAKALANDI" + error);
      setError(error);
      setLoading(false);
    }
  }, [searchTerm]);

  if (!loading)
    return (
      <div className="d-flex justify-content-center">
        <div style={{ position: "absolute", top: "30%", textAlign: "center" }}>
          <img
            src="../src/assets/no-result-icon.png"
            alt="Ürünü bulamadık"
            width={120}
            height={100}
          ></img>
          <ul>
            <li className="search-problem-list">
              {searchTerm} İlgili sonuç bulunamadı
            </li>
            <li className="search-problem-list">
              Yukarıda yer alan aramanıza benzer tahminlere göz atın
            </li>
            <li className="search-problem-list">
              Yazım kurallarına uyarak daha genel aramalar yapmayı tercih edin
            </li>
          </ul>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  return (
    <div>
      <Container>
        <Row>
          {products.map((product) => (
            <Col sm={12} lg={4} md={4} xl={4} key={product.id}>
              <Card
                style={{
                  height: "350px",
                  width: "250px",
                  boxShadow: "0 4px 9px black",
                  backgroundColor: "transparent",
                  marginBottom: "25px",
                }}
              >
                <CardTitle>
                  <CardImg top className="product-image" src={product.thumbnail}></CardImg>
                </CardTitle>
                <CardBody>
                  <CardText>{product.title}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Product;
