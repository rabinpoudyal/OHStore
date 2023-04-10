import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { getProductsAsync, selectProducts } from "./productsSlice";

const Products = () => {

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  console.log(products)

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <Row>
        {products.map((product, index) => {
          return (
            <Col sm="3" key={index}>
              <Card className="mt-4">
                <CardImg
                  top
                  height="100vh"
                  style={{ objectFit: "cover" }}
                  src={product.image}
                  alt={product.name}
                />
                <CardBody>
                  <CardTitle>{product.name}</CardTitle>
                  <CardSubtitle>{product.price}</CardSubtitle>
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    non risus.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Products;