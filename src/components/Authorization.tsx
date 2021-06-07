import React from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IAuthorization from '../interfaces/authorization.interface';

export default function Authorization({
  error,
  handleSubmit,
  emailRef,
  passwordRef,
  loading,
  name,
}: IAuthorization) {
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{name}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 my-2" type="submit">
              {name}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {name === 'Log In' ? (
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      ) : (
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      )}
    </>
  );
}
