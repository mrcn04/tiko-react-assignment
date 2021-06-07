import React from 'react';
import IPaginationButtons from '../interfaces/paginationButtons.interface';
import Button from './Button';

export default function PaginationButtons({
  page,
  onClick,
  numberOfPages,
}: IPaginationButtons) {
  const buttonStyle = {
    border: '1px solid black',
    margin: '0 5px',
    borderRadius: 5,
    padding: '0.25rem 1.5rem',
    backgroundColor: '#fff',
  };

  return (
    <div className="p-2 w-100">
      <Button
        name="First"
        onClick={() => onClick(1, 'first')}
        style={buttonStyle}
        disabled={page === 1}
      />
      <Button
        name="Back"
        onClick={() => onClick(page - 1)}
        style={buttonStyle}
        disabled={page === 1}
      />
      <span>
        {page} / {numberOfPages}
      </span>
      <Button
        name="Next"
        onClick={() => onClick(page + 1)}
        style={buttonStyle}
        disabled={page === numberOfPages}
      />
      <Button
        name="Last"
        onClick={() => onClick(Math.ceil(numberOfPages / 10), 'last')}
        style={buttonStyle}
        disabled={page === numberOfPages}
      />
    </div>
  );
}
