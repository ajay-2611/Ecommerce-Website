// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return ( <
        div className = "product-card"
        style = {
            { border: '1px solid #ccc', padding: '1rem', margin: '1rem' } } >
        <
        Link to = { `/product/${product._id}` } >
        <
        img src = { product.image }
        alt = { product.name }
        style = {
            { width: '100%' } }
        /> <
        /Link> <
        h3 > { product.name } < /h3> <
        p > $ { product.price } < /p> <
        Link to = { `/product/${product._id}` } > View Details < /Link> <
        /div>
    );
};

export default ProductCard;