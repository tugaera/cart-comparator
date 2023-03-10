import React from "react";
import { useState } from 'react';
import ProductCard from './product/product-card.js';

import { people, products } from './data.js';
import { getImageUrl } from './utils.js';

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [cart, setCart] = useState([]);

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    console.log('xIsNext', xIsNext)
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleProductClick(productId) {
    const nextCart = cart.slice();
    nextCart.push(productId);
    setCart(nextCart);
  }

  const listItems = products.map(product =>
    <li key={product.id}>
      <ProductCard product={product} productClick={() => handleProductClick(product.id)}/>
    </li>
  );

  const name = 'Coelho';

  return (
    <div>
      <div className="shopping-list">
        <h1>Shopping List for {name}</h1>
        <ul>
          {listItems}
        </ul>
      </div>
      <hr></hr>
      <div className="shopping-cart">
        <h1>Shopping List for {name} - {cart.length}</h1>
        <ul>
          {cart.map((line, index) =>
            <li key={index}>
              {line}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}