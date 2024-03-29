import React from 'react';
import './styles.css';

function ItemList({ title, description, html_url }) {
  return (
    <div className="item-list">
      <strong>
        <a href={html_url} target="_blank" rel="noreferrer">{title}</a>
      </strong>
      <p>{description}</p>
      <hr />
    </div>
  );
}

export default ItemList;
