import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function index({ cover, name, id }) {
  return (
    // <div className="category">
    <Link className="category" to={`/quiz/${name}/${id}`}>
      <div className="category__image">
        <img src={cover} alt="name" className="category__cover" />
      </div>

      <p>{name}</p>
    </Link>
    // </div>
  );
}

export default index;
