import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";
import AddProductModal from "./AddProductModal";
import {
  getProductsAsync,
  destroyProductAsync,
  addProductAsync,
  editProductAsync,
  selectProducts,
  setSelectedProduct,
  selectIsLoading,
} from "./productsSlice";

import styles from "./Products.module.css";
import { selectIsSignedIn } from "../login/loginSlice";

import _ from "lodash";

const Products = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoggedIn = useSelector(selectIsSignedIn);
  const isLoading = useSelector(selectIsLoading);

  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const toggle = () => setAddProductModalIsOpen(!addProductModalIsOpen);

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (hasMore) {
      dispatch(getProductsAsync({ page: pageNumber }));
    }
  }, [dispatch, hasMore, pageNumber]);

  useEffect(() => {
    setHasMore(products.length % 10 === 0);
  }, [products]);

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
      image: {},
    };
    dispatch(setSelectedProduct(product));
    toggle();
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const searchHandler = useCallback(
    _.debounce((search) => {
      dispatch(getProductsAsync({ name: search }));
    }, 1000),
    []
  );

  const handleSearch = (e) => {
    const search = e.target.value;
    searchHandler(search);
  };

  return (
    <div>
      <Row>
        <Col md="10">
          <h1 className="h1">Products</h1>
          <div className="d-flex justify-content-between"></div>
        </Col>
        <Col md="2">
          <div className="d-flex justify-content-end">
            {!isLoggedIn && (
              <Button outline color="dark" onClick={addNewProduct}>
                Add New
              </Button>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <div className="d-flex justify-content-between mt-5">
            <div>
            <Input
              type="text"
              placeholder="Search Products..."
              className={styles.searchBar}
              onChange={handleSearch}
            />
            </div>
          </div>
        </Col>
        <Col md="12">
          <div className="d-flex justify-content-between flex-wrap mt-5"> 
            {products.map((product, index) => {
              return (
                <div key={index} className="mt-2">
                  <div className={styles.productCard}>
                    <div className={styles.productImage}>
                      <img
                        src={product.product_image}
                        alt={product.name}
                        height={300}
                        width={300}
                      />
                    </div>
                    <div className={styles.productDetails}>
                      <div className={styles.productTitle}>{product.name}</div>
                      <div className={styles.productPrice}>
                        {formatter.format(product.price)}
                      </div>
                      <div className="d-flex justify-content-between gap-2">
                        <Button color="dark" outline>
                          Add to cart
                        </Button>
                        {!isLoggedIn && (
                          <>
                            <Button
                              color="dark"
                              outline
                              onClick={() => editProduct(product)}
                            >
                              Edit
                            </Button>
                            <Button
                              color="danger"
                              outline
                              className={styles.button}
                              onClick={() => destroyProduct(product.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>

      <div ref={lastProductRef}></div>

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
