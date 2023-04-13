import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync, selectEmail, selectIsSignedIn, selectPassword, setEmail, setPassword } from "./loginSlice";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { Navigate } from "react-router-dom";

const Login = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const isSignedIn = useSelector(selectIsSignedIn);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync({ email, password }));
  };

  if (isSignedIn) {
    return <Navigate to="/products" />;
  }

  return (
    <Container className="vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs="4">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Enter your password"
                id="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
            </FormGroup>
            <Button type="submit" color="primary" block>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;