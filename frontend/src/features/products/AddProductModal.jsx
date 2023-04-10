import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { selectSelectedProduct, setSelectedProduct } from './productsSlice';

const AddProductModal = ({ isOpen, toggle, addProduct, editProduct }) => {
    const selectedProduct = useSelector(selectSelectedProduct);
    const dispatch = useDispatch();
  
    const handleChange = (event) => {
      const { name, value, checked, type } = event.target;
      const val = type === 'checkbox' ? checked : value;
      
      dispatch(setSelectedProduct({
        ...selectedProduct,
        [name]: val,
      }));
    };

    const handleSubmit = (event) => {
      if (selectedProduct.id) {
        editProduct(selectedProduct);
      } else {
        addProduct(selectedProduct);
      }
    };
  
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={selectedProduct.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={selectedProduct.price}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={selectedProduct.availability}
                  onChange={handleChange}
                />
                {' '}
                Available
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={selectedProduct.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gtin">GTIN</Label>
              <Input
                type="text"
                name="gtin"
                id="gtin"
                value={selectedProduct.gtin}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  };

export default AddProductModal;
