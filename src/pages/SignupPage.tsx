import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Authorization from '../components/Authorization';
import { useAuth } from '../contexts/AuthContext';

export const SignupPage: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const context = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!context) {
      return null;
    }
    const { signup } = context;

    try {
      setError('');
      setLoading(true);
      signup(emailRef.current!.value, passwordRef.current!.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
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
          name="Sign up"
        />
      </div>
    </Container>
  );
};
