import React, { useEffect, useState } from "react";
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
import AddProductModal from "./AddProductModal";
import {
  getProductsAsync,
  destroyProductAsync,
  addProductAsync,
  selectProducts,
} from "./productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const toggle = () => setAddProductModalIsOpen(!addProductModalIsOpen);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  const destroyProduct = (id) => {
    dispatch(destroyProductAsync(id))
  };

  const createNewProduct = (product) => {
    const payload = {
      product: product
    }
    dispatch(addProductAsync(payload))
  };

  return (
    <div>
      <Row>
        <Col sm="8">
          <h1>Products</h1>
        </Col>
        <Col sm="4">
          <Button color="primary" onClick={toggle}>
            Add new product
          </Button>
        </Col>
      </Row>
      <Row>
        {products.map((product, index) => {
          return (
            <Col sm="4" key={index}>
              <Card className="mt-4">
                <CardImg
                  top
                  style={{ objectFit: "cover" }}
                  src="https://cdn.metcash.media/image/upload/w_1500,h_1500,c_pad,b_auto/alm-online/images/581103.jpg"
                  alt={product.name}
                />
                <CardBody>
                  <CardTitle>{product.name}</CardTitle>
                  <CardSubtitle>{product.price}</CardSubtitle>
                  <CardText>{product.description}</CardText>
                </CardBody>
                <CardFooter>
                  <Button color="primary">Add to cart</Button>
                  <Button
                    color="danger"
                    onClick={() => destroyProduct(product.id)}
                  >
                    Delete
                  </Button>
                  <Button color="warning" onClick={toggle}>Edit</Button>
                </CardFooter>
              </Card>
            </Col>
          );
        })}
      </Row>

      <AddProductModal
        isOpen={addProductModalIsOpen}
        toggle={toggle}
        addProduct={createNewProduct}
      />
    </div>
  );
};

export default Products;
