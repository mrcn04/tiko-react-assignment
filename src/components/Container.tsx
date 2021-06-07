import React from 'react';
import { Container } from 'react-bootstrap';
import ICustomContainer from '../interfaces/customContainer.interface';

export default function CustomContainer({
  children,
  maxWidth,
}: ICustomContainer) {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: maxWidth || 400 }}>
        {children}
      </div>
    </Container>
  );
}
