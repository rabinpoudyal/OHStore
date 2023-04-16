import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Form, Field, Radio, RadioGroup } from "@availity/form";
import * as yup from "yup";
import Alert from "../../Alert"
import { useFilePicker } from "use-file-picker";

import {
  selectSelectedProduct,
  selectErrors,
  selectStatus,
} from "./productsSlice";

const AddProductModal = ({ isOpen, toggle, addProduct, editProduct }) => {
  const selectedProduct = useSelector(selectSelectedProduct);
  const errors = useSelector(selectErrors);
  const status = useSelector(selectStatus);

  let [openFileSelector, { filesContent }] = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  });

  const handleSubmit = async (product) => {
    if (filesContent.length > 0) {
      console.log(filesContent);
      product.image = await (await fetch(filesContent[0].content)).blob();
    }

    if (product.id) {
      editProduct(product);
    } else {
      addProduct(product);
    }

    console.log(errors);

    if (status === "succeeded") {
      filesContent = [];
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
      {errors && errors.length > 0 && <Alert errors={errors}></Alert>}
      <Form
        initialValues={{
          ...selectedProduct,
          image: undefined,
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          name: yup.string().required("Name is required"),
          price: yup.number().required("Price is required"),
        })}
      >
        <ModalBody>
          <FormGroup className="mt-3">
            <Row>
              <Col md="3">
                <Label>Name*</Label>
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

          <FormGroup className="mt-3">
            <Row>
              <Col md="3">
                <Label>Price*</Label>
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

          <FormGroup className="mt-3">
            <Row>
              <Col md="3">
                <Label>Availability</Label>
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

          <FormGroup className="mt-3">
            <Row>
              <Col md="3">
                <Label>Description</Label>
              </Col>
              <Col md="9">
                <Field
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Enter product description"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup className="mt-3">
            <Row>
              <Col md="3">
                <Label>GTIN</Label>
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

          <FormGroup className="mt-3">
            <Row>
              <Col md="3">
                <Label>Product Image</Label>
              </Col>
              <Col md="9">
                <Button color="primary" onClick={() => openFileSelector()}>
                  Select Image{" "}
                </Button>
                {filesContent &&
                  filesContent.length > 0 &&
                  filesContent.map((file, index) => (
                    <div>
                      <div key={index}>{file.name}</div>
                      <img src={file.content} width={100} />
                    </div>
                  ))}
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
