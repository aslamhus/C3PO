import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './star-wars-loader.css';

export default function StarWarsLoader({}) {
  return (
    <div className="star-wars-loader">
      <Spinner animation="border" role="status" />
      <p>Loading...</p>
    </div>
  );
}
