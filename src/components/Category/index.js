import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function index({ cover, name, id }) {
  return (
    <div className="category">
      <div className="category__image">
        <img src={cover} alt="name" className="category__cover" />
      </div>
      <Link to={`/quiz/${name}/${id}`}>
        <p>{name}</p>
      </Link>
    </div>
  );
}

export default index;
