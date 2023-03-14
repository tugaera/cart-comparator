import React from "react";

import { getImageUrl } from './../utils';

// const person = {
//   name: 'Gregorio Y. Zara',
//   theme: {
//     backgroundColor: 'black',
//     color: 'pink'
//   }
// };

export default function ProductCard({product, productClick}: {product: any, productClick: any}) {

    // const [value, setValue] = useState(null);

    return (
        <div style={product.theme}>
            <h1>Product: {product.name}</h1>
            <img
                className="avatar"
                src={getImageUrl(product)}
                alt={product.name}
            />
            <p>
                {' ' + product.price + '€ '}
                known for {product.category}
            </p>
            <button onClick={productClick}>ADD_TO_CART</button>
        </div>
    );
}
