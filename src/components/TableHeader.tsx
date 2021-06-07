/* eslint-disable react/no-array-index-key */
import React from 'react';

interface ITableHeaders {
  headers: string[];
}

export default function TableHeader(props: ITableHeaders) {
  const { headers } = props;

  const elements = headers.map((head, index) => {
    return <th key={index}>{head}</th>;
  });
  return <>{elements}</>;
}
