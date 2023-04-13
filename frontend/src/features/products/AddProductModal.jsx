import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Form,
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Form, Field, Radio, RadioGroup } from "@availity/form";
import * as yup from "yup";
// import { FilePicker } from '@availity/form-upload';
// import { CustomInput } from 'reactstrap';


import { selectSelectedProduct, setSelectedProduct } from "./productsSlice";

const AddProductModal = ({ isOpen, toggle, addProduct, editProduct }) => {
  const selectedProduct = useSelector(selectSelectedProduct);
  const dispatch = useDispatch();

  const handleSubmit = (product) => {
    console.log("product", product);
    if (product.id) {
      editProduct(product);
    } else {
      addProduct(product);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
      <Form
        initialValues={{
          ...selectedProduct,
          image: undefined
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          name: yup.string().required("Name is required"),
          price: yup.number().required("Price is required"),
        })}
      >
        <ModalBody>
          <FormGroup className="mt-3" for="name">
            <Row>
              <Col md="3">
                <Label for="name">Name*</Label>
              </Col>
              <Col md="9">
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter product name"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup className="mt-3" for="price">
            <Row>
              <Col md="3">
                <Label for="price">Price*</Label>
              </Col>
              <Col md="9">
                <Field
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter product price"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup className="mt-3" for="availability">
            <Row>
              <Col md="3">
                <Label for="availability">Availability</Label>
              </Col>
              <Col md="9">
                <RadioGroup name="availability" label="">
                  <Radio
                    name="availability"
                    label="Yes"
                    value={true === selectedProduct.availability}
                  />
                  <Radio
                    name="availability"
                    label="No"
                    value={false === selectedProduct.availability}
                  />
                </RadioGroup>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup className="mt-3" for="description">
            <Row>
              <Col md="3">
                <Label for="description">Description</Label>
              </Col>
              <Col md="9">
                <Field
                  type="textarea"
                  name="description"
                  id="description"
                  value={selectedProduct.description}
                  placeholder="Enter product description"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup className="mt-3" for="gtin">
            <Row>
              <Col md="3">
                <Label for="gtin">GTIN</Label>
              </Col>
              <Col md="9">
                <Field
                  type="text"
                  name="gtin"
                  id="gtin"
                  placeholder="Enter product GTIN"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup className="mt-3" for="gtin">
            <Row>
              <Col md="3">
                <Label for="image">Product Image</Label>
              </Col>
              <Col md="9">
                {/* <FilePicker
                  name="image"
                  tag={CustomInput}
                /> */}
              </Col>
            </Row>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="dark" type="submit">
            Save
          </Button>{" "}
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
