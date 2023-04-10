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
  CardFooter,
  Button,
} from "reactstrap";
import { getProductsAsync, destroyProductAsync, selectProducts, removeProductById } from "./productsSlice";

const Products = () => {

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  const destroyProduct = (id) => {
    const result = dispatch(destroyProductAsync(id))
    result.then(() => dispatch(removeProductById(id)))
  }


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
                    {product.description}
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Button color="primary">Add to cart</Button>
                  <Button color="danger" onClick={() => destroyProduct(product.id)}>Delete</Button>
                </CardFooter>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Products;
