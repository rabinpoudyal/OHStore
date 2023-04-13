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
  editProductAsync,
  selectProducts,
  setSelectedProduct,
} from "./productsSlice";

import styles from "./Products.module.css";
import { selectIsSignedIn } from "../login/loginSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoggedIn = useSelector(selectIsSignedIn);

  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const toggle = () => setAddProductModalIsOpen(!addProductModalIsOpen);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  const destroyProduct = (id) => {
    dispatch(destroyProductAsync(id));
  };

  const createNewProduct = (product) => {
    const payload = {
      product: product,
    };
    dispatch(addProductAsync(payload));
  };

  const editExistingProduct = (product) => {
    const { id, type, ...prodctToEdit } = product;
    const payload = {
      product: prodctToEdit,
    };
    dispatch(editProductAsync({ payload, id }));
    toggle();
  };

  const editProduct = (product) => {
    dispatch(setSelectedProduct(product));
    toggle();
  };

  const addNewProduct = () => {
    const product = {
      name: "",
      price: "",
      availability: true,
      description: "",
      gtin: "",
    };
    dispatch(setSelectedProduct(product));
    toggle();
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div>
      <Row>
        <Col sm="8">
          <h1>Products</h1>
        </Col>
        <Col sm="4">
          {isLoggedIn && (
            <Button color="dark" onClick={addNewProduct}>
              Add New
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <div className="d-flex justify-content-between flex-wrap gap-0">
        {products.map((product, index) => {
          return (
            <div key={index}>
              <Card className="" style={{ width: "15", height: "5" }}>
                <CardImg
                  // className="img-fluid"
                  style={{ height: "10" }}
                  src="https://cdn.metcash.media/image/upload/w_100,h_100,c_pad,b_auto/alm-online/images/581103.jpg"
                  alt={product.name}
                />
                <CardBody></CardBody>
                <CardFooter>
                  <div className="d-flex justify-content-between">
                    <div className={styles.productTitle}>{product.name}</div>
                    <div className={styles.productPrice}>
                      {formatter.format(product.price)}
                    </div>
                  </div>
                  <CardText>{product.description}</CardText>
                  <Button color="dark" outline>Add to cart</Button>
                  {isLoggedIn && (
                    <div>
                      <Button
                        color="danger"
                        onClick={() => destroyProduct(product.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        color="warning"
                        onClick={() => editProduct(product)}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          );
        })}
        </div>
      </Row>

      <AddProductModal
        isOpen={addProductModalIsOpen}
        toggle={toggle}
        addProduct={createNewProduct}
        editProduct={editExistingProduct}
      />
    </div>
  );
};

export default Products;
