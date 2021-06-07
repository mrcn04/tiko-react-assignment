import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Authorization from '../components/Authorization';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const context = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!context) {
      return null;
    }
    const { login } = context;

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current!.value, passwordRef.current!.value);
      history.push('/form');
    } catch {
      setError('Failed to log in');
    }

    return setLoading(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: 400 }}>
        <Authorization
          error={error}
          handleSubmit={handleSubmit}
          emailRef={emailRef}
          passwordRef={passwordRef}
          loading={loading}
          name="Log In"
        />
      </div>
    </Container>
  );
};
