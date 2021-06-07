import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

interface IHeader {
  name: string;
  path: string;
}

export default function Header({ name, path }: IHeader): JSX.Element {
  const context = useAuth();
  const history = useHistory();

  const onSignOutHandler = () => {
    if (context) {
      context.logout();
    }
    history.push('/login');
  };

  return (
    <div className="d-flex justify-content-between align-items-baseline flex-wrap">
      <span>Current User: {context?.user?.email}</span>
      <div>
        <Button
          name="Sign Out"
          style={{
            padding: '5px 15px',
            borderRadius: 5,
            background: 'transparent',
            border: '1px solid red',
            margin: '0 5px',
            color: 'red',
          }}
          onClick={onSignOutHandler}
        />
        <Link to={path}>
          <button
            type="button"
            style={{
              padding: '5px 15px',
              borderRadius: 5,
              background: 'transparent',
              border: '1px solid black',
              margin: '0 5px',
            }}
          >
            {name}
          </button>
        </Link>
      </div>
    </div>
  );
}
