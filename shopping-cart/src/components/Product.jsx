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
    const getAxiosProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`
        );
        const data = await response.data.results;
        if (data.length > 0) {
          setProducts(data);
        } else {
          setProducts([]);
          setError(`${searchTerm} İlgili Ürün bulunamadı `);
        }
      } catch (err) {
        console.log("API HATASI" + err);
        setError("Bir hata oluştu tekrar deneyin");
      } finally {
        setLoading(false);
      }
    };
    if (searchTerm) {
      getAxiosProduct();
    }
  }, [searchTerm]);

  if (loading)
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
      <Container className="my-5">
        <Row>
          {products?.map((product) => (
            <Col sm={12} lg={4} md={6} xl={4} key={product.id}>
              <Card className="Card">
                <CardTitle style={{ padding: "0" }}>
                  <CardImg
                    top
                    className="product-image"
                    src={product.thumbnail}
                  ></CardImg>
                </CardTitle>
                <CardBody>
                  <CardText>{product.title}</CardText>
                  <CardText>
                    Fiyat: <strong>{product.price}</strong>
                  </CardText>

                  <CardText>
                    Taksit Oranı: <strong>{product.installments.rate}</strong>
                  </CardText>
                  <CardText>
                    Her Taksitte Ödenecek tutar:{" "}
                    <strong>{product.installments.amount}</strong>
                  </CardText>
                  <hr></hr>
                  <h5 className="text-center mb-3">Satıcı Bilgileri:</h5>
                  <CardText>
                    Adı: <strong>{product.seller.nickname} </strong>
                  </CardText>
                  <CardText>{`Puan: ${product.rating}`}</CardText>
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
