import { useState } from 'react';
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
// import { addProduct } from '../actions/productActions';

const AddProductModal = ({ isOpen, toggle, addProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState(true);
    const [description, setDescription] = useState('');
    const [gtin, setGtin] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Create a new product object from the form data
      const newProduct = {
        name,
        price: parseFloat(price),
        availability,
        description,
        gtin,
      };
  
      // Call the addProduct action to add the new product to the store
      addProduct(newProduct);
  
      // Reset the form state
      setName('');
      setPrice('');
      setAvailability(true);
      setDescription('');
      setGtin('');
  
      // Close the modal
      toggle();
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
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={availability}
                  onChange={(event) => setAvailability(event.target.checked)}
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
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gtin">GTIN</Label>
              <Input
                type="text"
                name="gtin"
                id="gtin"
                value={gtin}
                onChange={(event) => setGtin(event.target.value)}
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
  