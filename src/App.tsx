// import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useState, FC } from 'react';
import ProductCard from './product/product-card';

import { /* people, */ products } from './data';
// import { getImageUrl } from './utils';
import { useZxing } from './barcode-scanner/barcode-scanner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [cart, setCart] = useState([]);

  // function handleClick(i: any) {
  //   if (squares[i]) {
  //     return;
  //   }
  //   const nextSquares = squares.slice();
  //   console.log('xIsNext', xIsNext)
  //   if (xIsNext) {
  //     nextSquares[i] = "X";
  //   } else {
  //     nextSquares[i] = "O";
  //   }
  //   setSquares(nextSquares);
  //   setXIsNext(!xIsNext);
  // }

  function handleProductClick(productId: any) {
    const nextCart: any[] = cart.slice();
    nextCart.push(productId);
    setCart(nextCart as any);
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

// function calculateWinner(squares: any) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

const BarcodeScanner: FC<any> = ({
  onResult = (res: any) => {},
  onError = (err: any) => {},
}) => {
  const { ref } = useZxing({ onResult, onError });
  
  return <video ref={ref} />;
};

function MyApp() {
  const name = 'Coelho';
  const [isError, setIsError] = useState<boolean>(false);
  const [cart, setCart] = useState<string[]>([]);

  const onResult = (res: any) => {
    console.log('res', res?.text);
    // const nextCart: string[] = cart.slice();
    // setCart(nextCart);
    console.log('cart', cart);
    const nextCart: string[] = Object.assign([], cart);
    nextCart.push(res?.text);
    console.log('nextCart', nextCart);
    setCart(prevCart => [res?.text, ...prevCart])
  };
  const onError = (err: any) => {
    // console.log('err', err);
    console.log('err');
    setIsError(true);
  }

  const { ref } = useZxing({ onResult, onError });
  
  

  return (
    <>
      <video ref={ref} />
      <h1>Shopping List for {name} - {cart.length} - {isError ? 'ERROR' : 'SUCCESS'}</h1>
      <ul>
        {cart.map((line, index) =>
          <li key={index}>
            {line}
          </li>
        )}
      </ul>
    </>
  );
}

export default MyApp;