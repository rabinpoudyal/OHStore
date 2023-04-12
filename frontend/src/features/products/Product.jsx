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

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

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
          <Button color="dark" onClick={addNewProduct}>
            Add New
          </Button>
        </Col>
      </Row>
      <Row>
        {products.map((product, index) => {
          return (
            <Col sm="3" key={index}>
              <Card className="mt-4 h-25">
                <CardImg
                  top
                  style={{ objectFit: "cover" }}
                  src="https://cdn.metcash.media/image/upload/w_1500,h_1500,c_pad,b_auto/alm-online/images/581103.jpg"
                  alt={product.name}
                />
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div className={styles.productTitle}>{product.name}</div>
                    <div className={styles.productPrice}>
                      {formatter.format(product.price)}
                    </div>
                  </div>
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
                  <Button color="warning" onClick={() => editProduct(product)}>
                    Edit
                  </Button>
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
        editProduct={editExistingProduct}
      />
    </div>
  );
};

export default Products;
