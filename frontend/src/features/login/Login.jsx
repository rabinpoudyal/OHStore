import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginAsync,
  selectEmail,
  selectErrors,
  selectIsSignedIn,
  selectPassword,
} from "./loginSlice";
import { Container, Row, Col, FormGroup, Button } from "reactstrap";

import { Form, Field } from "@availity/form";
import * as yup from "yup";

import { Navigate } from "react-router-dom";
import Alert from "../../Alert";

const Login = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const isSignedIn = useSelector(selectIsSignedIn);
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();

  const handleSubmit = ({ email, password }) => {
    dispatch(loginAsync({ email, password }));
  };

  if (isSignedIn) {
    return <Navigate to="/products" />;
  }

  return (
    <Container className="vh-75 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        {errors && errors.length > 0 && <Alert errors={errors} />}

        <Col xs="4">
          <Form
            onSubmit={handleSubmit}
            validationSchema={yup.object().shape({
              email: yup.string().required("Email is required"),
              password: yup.string().required("Password is required"),
            })}
            initialValues={{
              email: email,
              password: password,
            }}
          >
            <FormGroup className="">
              <Field
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </FormGroup>
            <FormGroup className="mt-3">
              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
                id="password"
              />
            </FormGroup>
            <Button type="submit" color="dark" block className="mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
