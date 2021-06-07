import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes';

function App(): JSX.Element {
  return (
    <div>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
