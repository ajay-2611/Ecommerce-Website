import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaHeart, FaShieldAlt, FaShoppingCart, FaStar, FaTruck, FaUndo } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import allProducts from "../data/products";

const ProductScreen = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        // Find product from local data
        const foundProduct = allProducts.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setLoading(false);
        } else {
            setError("Product not found");
            setLoading(false);
        }
    }, [id]);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= product.countInStock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        if (!product || product.countInStock === 0) return;
        
        setAddingToCart(true);
        try {
            // Add product to cart with selected quantity
            const productToAdd = {
                ...product,
                quantity: quantity,
                price: product.new_price // Use new_price as the current price
            };
            
            addToCart(productToAdd);
            
            // Show success message (you can implement a toast notification here)
            alert(`${product.name} added to cart!`);
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "50vh",
            fontSize: "1.2rem",
            color: "#666"
        }}>
            Loading product...
        </div>
    );

    if (error) return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "50vh",
            fontSize: "1.2rem",
            color: "#dc3545"
        }}>
            Error: {error}
        </div>
    );

    if (!product) return null;

    // Create image gallery (main image + 4 additional images)
    const productImages = [
        product.image,
        product.image, // You can add more product images here
        product.image,
        product.image,
        product.image
    ];

    return (
        <div style={{ 
            maxWidth: "1200px", 
            margin: "0 auto", 
            padding: "20px",
            fontFamily: "'Poppins', sans-serif"
        }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: "2rem" }}>
                <Link to="/" style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px",
                    textDecoration: "none", 
                    color: "#007bff",
                    fontSize: "1rem",
                    fontWeight: "500"
                }}>
                    <FaArrowLeft size={16} />
                    Back to Products
                </Link>
            </div>

            {/* Product Details */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
                marginBottom: "3rem"
            }}>
                {/* Product Images */}
                <div>
                    {/* Main Image */}
                    <div style={{
                        border: "1px solid #f0f0f0",
                        borderRadius: "15px",
                        overflow: "hidden",
                        marginBottom: "1rem"
                    }}>
                        <img 
                            src={productImages[selectedImage]} 
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "500px",
                                objectFit: "cover"
                            }}
                        />
                    </div>

                    {/* Image Gallery */}
                    <div style={{
                        display: "flex",
                        gap: "10px"
                    }}>
                        {productImages.map((img, index) => (
                            <div 
                                key={index}
                                style={{
                                    border: `2px solid ${selectedImage === index ? '#007bff' : '#f0f0f0'}`,
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease"
                                }}
                                onClick={() => setSelectedImage(index)}
                                onMouseEnter={(e) => {
                                    if (selectedImage !== index) {
                                        e.currentTarget.style.borderColor = "#007bff";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedImage !== index) {
                                        e.currentTarget.style.borderColor = "#f0f0f0";
                                    }
                                }}
                            >
                                <img 
                                    src={img} 
                                    alt={`${product.name} ${index + 1}`}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover"
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    {/* Category Badge */}
                    <div style={{
                        display: "inline-block",
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "6px 16px",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        marginBottom: "1rem"
                    }}>
                        {product.category}
                    </div>

                    {/* Product Title */}
                    <h1 style={{ 
                        fontSize: "2.5rem", 
                        fontWeight: "700", 
                        marginBottom: "1rem",
                        color: "#333",
                        lineHeight: "1.2"
                    }}>
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px",
                        marginBottom: "1.5rem"
                    }}>
                        <div style={{ display: "flex", gap: "2px" }}>
                            {[...Array(5)].map((_, i) => (
                                <FaStar 
                                    key={i} 
                                    size={18} 
                                    color={i < 4 ? "#ffc107" : "#e9ecef"} 
                                />
                            ))}
                        </div>
                        <span style={{ 
                            fontSize: "1rem", 
                            color: "#666",
                            marginLeft: "8px"
                        }}>
                            4.0 (128 reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "15px",
                        marginBottom: "2rem"
                    }}>
                        <span style={{ 
                            fontSize: "2.5rem", 
                            fontWeight: "700", 
                            color: "#007bff" 
                        }}>
                            ₹{product.new_price}
                        </span>
                        {product.old_price && (
                            <span style={{ 
                                fontSize: "1.5rem", 
                                color: "#999", 
                                textDecoration: "line-through" 
                            }}>
                                ₹{product.old_price}
                            </span>
                        )}
                        {product.old_price && (
                            <span style={{
                                backgroundColor: "#28a745",
                                color: "white",
                                padding: "4px 12px",
                                borderRadius: "20px",
                                fontSize: "0.9rem",
                                fontWeight: "600"
                            }}>
                                {Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}% OFF
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ 
                            fontSize: "1.2rem", 
                            fontWeight: "600", 
                            marginBottom: "0.5rem",
                            color: "#333"
                        }}>
                            Description
                        </h3>
                        <p style={{ 
                            fontSize: "1rem", 
                            color: "#666", 
                            lineHeight: "1.6" 
                        }}>
                            {product.description}
                        </p>
                    </div>

                    {/* Stock Status */}
                    <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ 
                            fontSize: "1.2rem", 
                            fontWeight: "600", 
                            marginBottom: "0.5rem",
                            color: "#333"
                        }}>
                            Availability
                        </h3>
                        <p style={{ 
                            fontSize: "1rem", 
                            color: product.countInStock > 0 ? "#28a745" : "#dc3545",
                            fontWeight: "600"
                        }}>
                            {product.countInStock > 0 ? `${product.countInStock} items in stock` : "Out of Stock"}
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    {product.countInStock > 0 && (
                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ 
                                fontSize: "1.2rem", 
                                fontWeight: "600", 
                                marginBottom: "0.5rem",
                                color: "#333"
                            }}>
                                Quantity
                            </h3>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "15px"
                            }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "2px solid #e9ecef",
                                    borderRadius: "8px",
                                    overflow: "hidden"
                                }}>
                                    <button 
                                        style={{
                                            padding: "12px 16px",
                                            border: "none",
                                            backgroundColor: "#f8f9fa",
                                            cursor: "pointer",
                                            fontSize: "1.2rem",
                                            fontWeight: "600"
                                        }}
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span style={{
                                        padding: "12px 20px",
                                        borderLeft: "1px solid #e9ecef",
                                        borderRight: "1px solid #e9ecef",
                                        backgroundColor: "white",
                                        fontSize: "1.1rem",
                                        fontWeight: "600",
                                        minWidth: "60px",
                                        textAlign: "center"
                                    }}>
                                        {quantity}
                                    </span>
                                    <button 
                                        style={{
                                            padding: "12px 16px",
                                            border: "none",
                                            backgroundColor: "#f8f9fa",
                                            cursor: "pointer",
                                            fontSize: "1.2rem",
                                            fontWeight: "600"
                                        }}
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        disabled={quantity >= product.countInStock}
                                    >
                                        +
                                    </button>
                                </div>
                                <span style={{ color: "#666" }}>
                                    {product.countInStock} available
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "2rem"
                    }}>
                        <button 
                            style={{
                                flex: 1,
                                padding: "16px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            }}
                            onClick={handleAddToCart}
                            disabled={product.countInStock === 0 || addingToCart}
                            onMouseEnter={(e) => {
                                if (product.countInStock > 0) {
                                    e.target.style.backgroundColor = "#0056b3";
                                    e.target.style.transform = "translateY(-2px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (product.countInStock > 0) {
                                    e.target.style.backgroundColor = "#007bff";
                                    e.target.style.transform = "translateY(0)";
                                }
                            }}
                        >
                            <FaShoppingCart size={18} />
                            {product.countInStock > 0 ? (addingToCart ? "Adding..." : "Add to Cart") : "Out of Stock"}
                        </button>
                        <button style={{
                            padding: "16px",
                            backgroundColor: "white",
                            color: "#dc3545",
                            border: "2px solid #dc3545",
                            borderRadius: "8px",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#dc3545";
                            e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "white";
                            e.target.style.color = "#dc3545";
                        }}>
                            <FaHeart size={18} />
                        </button>
                    </div>

                    {/* Features */}
                    <div style={{
                        border: "1px solid #f0f0f0",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        backgroundColor: "#f8f9fa"
                    }}>
                        <h3 style={{ 
                            fontSize: "1.2rem", 
                            fontWeight: "600", 
                            marginBottom: "1rem",
                            color: "#333"
                        }}>
                            Product Features
                        </h3>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "1rem"
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                <FaTruck style={{ color: "#007bff" }} />
                                <span style={{ fontSize: "0.9rem", color: "#666" }}>
                                    Free shipping on orders above ₹500
                                </span>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                <FaShieldAlt style={{ color: "#28a745" }} />
                                <span style={{ fontSize: "0.9rem", color: "#666" }}>
                                    100% Authentic Products
                                </span>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                <FaUndo style={{ color: "#ffc107" }} />
                                <span style={{ fontSize: "0.9rem", color: "#666" }}>
                                    30-Day Return Policy
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div style={{ marginTop: "4rem" }}>
                <h2 style={{ 
                    fontSize: "2rem", 
                    fontWeight: "600", 
                    marginBottom: "2rem",
                    color: "#333",
                    textAlign: "center"
                }}>
                    You Might Also Like
                </h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "2rem"
                }}>
                    {allProducts
                        .filter(p => p.category === product.category && p.id !== product.id)
                        .slice(0, 4)
                        .map((relatedProduct) => (
                            <div key={relatedProduct.id} style={{
                                border: "1px solid #f0f0f0",
                                borderRadius: "12px",
                                padding: "1rem",
                                transition: "all 0.3s ease",
                                cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}>
                                <Link to={`/product/${relatedProduct.id}`} style={{ textDecoration: "none" }}>
                                    <img 
                                        src={relatedProduct.image} 
                                        alt={relatedProduct.name}
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            marginBottom: "1rem"
                                        }}
                                    />
                                    <h4 style={{ 
                                        fontSize: "1rem", 
                                        fontWeight: "600", 
                                        marginBottom: "0.5rem",
                                        color: "#333",
                                        lineHeight: "1.4"
                                    }}>
                                        {relatedProduct.name}
                                    </h4>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}>
                                        <span style={{ 
                                            fontSize: "1.1rem", 
                                            fontWeight: "700", 
                                            color: "#007bff" 
                                        }}>
                                            ₹{relatedProduct.new_price}
                                        </span>
                                        {relatedProduct.old_price && (
                                            <span style={{ 
                                                fontSize: "0.9rem", 
                                                color: "#999", 
                                                textDecoration: "line-through" 
                                            }}>
                                                ₹{relatedProduct.old_price}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;