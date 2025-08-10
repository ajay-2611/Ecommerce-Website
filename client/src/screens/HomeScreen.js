import React, { useCallback, useEffect, useState } from "react";
import { FaChild, FaFemale, FaHeart, FaMale, FaShoppingBag, FaShoppingCart, FaStar, FaTshirt } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Import your actual product data
import allProducts from "../data/products";

// Import banner and hero images
import bannerKids from "../assets/images/banner_kids.png";
import bannerMens from "../assets/images/banner_mens.png";
import bannerWomen from "../assets/images/banner_women.png";
import heroImage from "../assets/images/hero_image.png";

const categories = [
    { name: "All", icon: <FaTshirt />, banner: bannerMens },
    { name: "Men", icon: <FaMale />, banner: bannerMens },
    { name: "Women", icon: <FaFemale />, banner: bannerWomen },
    { name: "Kid", icon: <FaChild />, banner: bannerKids },
];

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    useEffect(() => {
        // Use local product data instead of API call for now
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setLoading(false);
    }, []);

    // Filter products based on category
    const filterByCategory = useCallback((category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredProducts(products);
            // Don't navigate if we're already on the home page
            if (window.location.pathname !== '/' || window.location.search !== '') {
                navigate('/');
            }
        } else {
            const filtered = products.filter(
                (product) =>
                product.category &&
                product.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredProducts(filtered);
            navigate(`/?category=${category.toLowerCase()}`);
        }
    }, [products, navigate]);

    // Handle URL parameters for category filtering
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            const category = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
            if (category === 'Kid') {
                filterByCategory('Kid');
            } else {
                filterByCategory(category);
            }
        } else {
            // No category in URL, show all products
            setSelectedCategory('All');
            setFilteredProducts(products);
        }
    }, [searchParams, filterByCategory, products]);

    if (loading) return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "50vh",
            fontSize: "1.2rem",
            color: "#666"
        }}>
            <div>Loading products...</div>
        </div>
    );



    return (
        <div style={{ fontFamily: "'Poppins', sans-serif" }}>
            {/* Hero Section */}
            <div style={{
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                marginBottom: "3rem"
            }}>
                <div>
                    <h1 style={{ 
                        fontSize: "3.5rem", 
                        fontWeight: "700", 
                        marginBottom: "1rem",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                    }}>
                        Fashion Forward
                    </h1>
                    <p style={{ 
                        fontSize: "1.3rem", 
                        marginBottom: "2rem",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
                    }}>
                        Discover the latest trends in men's, women's, and kids' fashion
                    </p>
                    <button 
                        onClick={() => {
                            // Scroll to products section
                            document.getElementById('products-section').scrollIntoView({ 
                                behavior: 'smooth' 
                            });
                        }}
                        style={{
                            padding: "15px 30px",
                            fontSize: "1.1rem",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "50px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(0,123,255,0.3)"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#0056b3";
                            e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#007bff";
                            e.target.style.transform = "translateY(0)";
                        }}>
                        Shop Now
                    </button>
                </div>
            </div>

            {/* Category Banners */}
            <div style={{ 
                maxWidth: "1200px", 
                margin: "0 auto", 
                padding: "0 20px",
                marginBottom: "3rem"
            }}>
                <h2 style={{ 
                    textAlign: "center", 
                    fontSize: "2.5rem", 
                    marginBottom: "2rem",
                    color: "#333",
                    fontWeight: "600"
                }}>
                    Shop by Category
                </h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "2rem"
                }}>
                    {categories.slice(1).map((cat) => (
                        <div key={cat.name} style={{
                            position: "relative",
                            borderRadius: "15px",
                            overflow: "hidden",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                        }}
                        onClick={() => {
                            filterByCategory(cat.name);
                            // Scroll to products section after filtering
                            setTimeout(() => {
                                document.getElementById('products-section').scrollIntoView({ 
                                    behavior: 'smooth' 
                                });
                            }, 100);
                        }}>
                            <img 
                                src={cat.banner} 
                                alt={cat.name} 
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover"
                                }}
                            />
                            <div style={{
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                right: "0",
                                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                                color: "white",
                                padding: "2rem 1.5rem 1.5rem",
                                textAlign: "center"
                            }}>
                                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                                    {cat.icon}
                                </div>
                                <h3 style={{ 
                                    fontSize: "1.5rem", 
                                    margin: "0",
                                    fontWeight: "600"
                                }}>
                                    {cat.name === "Kid" ? "Kids'" : cat.name + "'s"} Collection
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Filters */}
            <div style={{ 
                maxWidth: "1200px", 
                margin: "0 auto", 
                padding: "0 20px",
                marginBottom: "2rem"
            }}>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    gap: "1rem",
                    flexWrap: "wrap"
                }}>
                    {categories.map((cat) => (
                        <button 
                            key={cat.name}
                            onClick={() => {
                                filterByCategory(cat.name);
                                // Scroll to products section after filtering
                                setTimeout(() => {
                                    document.getElementById('products-section').scrollIntoView({ 
                                        behavior: 'smooth' 
                                    });
                                }, 100);
                            }}
                            style={{
                                cursor: "pointer",
                                padding: "12px 24px",
                                backgroundColor: selectedCategory === cat.name ? "#007bff" : "#f8f9fa",
                                color: selectedCategory === cat.name ? "#fff" : "#333",
                                border: selectedCategory === cat.name ? "none" : "2px solid #e9ecef",
                                borderRadius: "50px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontWeight: "600",
                                fontSize: "1rem",
                                transition: "all 0.3s ease",
                                boxShadow: selectedCategory === cat.name ? "0 4px 15px rgba(0,123,255,0.3)" : "none"
                            }}
                            onMouseEnter={(e) => {
                                if (selectedCategory !== cat.name) {
                                    e.target.style.backgroundColor = "#e9ecef";
                                    e.target.style.borderColor = "#007bff";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedCategory !== cat.name) {
                                    e.target.style.backgroundColor = "#f8f9fa";
                                    e.target.style.borderColor = "#e9ecef";
                                }
                            }}>
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div 
                id="products-section"
                style={{ 
                    maxWidth: "1200px", 
                    margin: "0 auto", 
                    padding: "0 20px",
                    marginBottom: "3rem"
                }}
            >
                <h2 style={{ 
                    textAlign: "center", 
                    fontSize: "2.5rem", 
                    marginBottom: "2rem",
                    color: "#333",
                    fontWeight: "600"
                }}>
                    {selectedCategory === "All" ? "All Products" : `${selectedCategory}'s Collection`}
                </h2>
                {filteredProducts.length === 0 ? (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "3rem",
                        color: "#666"
                    }}>
                        <h3>No products found in this category.</h3>
                        <p>Try selecting a different category or check back later.</p>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "2rem"
                    }}>
                        {filteredProducts.map((product) => (
                            <div key={product.id} style={{
                                border: "1px solid #f0f0f0",
                                borderRadius: "15px",
                                padding: "1rem",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                                transition: "all 0.3s ease",
                                backgroundColor: "white",
                                position: "relative",
                                overflow: "hidden"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
                            }}>
                                {/* Product Image */}
                                <div style={{ position: "relative", marginBottom: "1rem" }}>
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            style={{
                                                width: "100%",
                                                height: "280px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                                transition: "transform 0.3s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = "scale(1.05)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = "scale(1)";
                                            }}
                                        />
                                    </Link>
                                    
                                    {/* Action Buttons */}
                                    <div style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px"
                                    }}>
                                        <button style={{
                                            width: "35px",
                                            height: "35px",
                                            borderRadius: "50%",
                                            border: "none",
                                            backgroundColor: "white",
                                            color: "#666",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                            transition: "all 0.3s ease"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "#ff4757";
                                            e.target.style.color = "white";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = "white";
                                            e.target.style.color = "#666";
                                        }}>
                                            <FaHeart size={16} />
                                        </button>
                                        <button style={{
                                            width: "35px",
                                            height: "35px",
                                            borderRadius: "50%",
                                            border: "none",
                                            backgroundColor: "white",
                                            color: "#666",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                            transition: "all 0.3s ease"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "#007bff";
                                            e.target.style.color = "white";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = "white";
                                            e.target.style.color = "#666";
                                        }}>
                                            <FaShoppingCart size={16} />
                                        </button>
                                    </div>

                                    {/* Category Badge */}
                                    <div style={{
                                        position: "absolute",
                                        top: "10px",
                                        left: "10px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        padding: "4px 12px",
                                        borderRadius: "20px",
                                        fontSize: "0.8rem",
                                        fontWeight: "600",
                                        textTransform: "capitalize"
                                    }}>
                                        {product.category}
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div style={{ padding: "0 0.5rem" }}>
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        <h3 style={{ 
                                            margin: "0 0 0.5rem 0",
                                            fontSize: "1.1rem",
                                            fontWeight: "600",
                                            color: "#333",
                                            lineHeight: "1.4",
                                            height: "3rem",
                                            overflow: "hidden",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical"
                                        }}>
                                            {product.name}
                                        </h3>
                                    </Link>
                                    
                                    {/* Rating */}
                                    <div style={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        gap: "4px",
                                        marginBottom: "0.5rem"
                                    }}>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar 
                                                key={i} 
                                                size={14} 
                                                color={i < 4 ? "#ffc107" : "#e9ecef"} 
                                            />
                                        ))}
                                        <span style={{ 
                                            fontSize: "0.8rem", 
                                            color: "#666",
                                            marginLeft: "4px"
                                        }}>
                                            (4.0)
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div style={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        gap: "10px",
                                        marginBottom: "1rem"
                                    }}>
                                        <span style={{ 
                                            fontSize: "1.3rem", 
                                            fontWeight: "700", 
                                            color: "#007bff" 
                                        }}>
                                            ₹{product.new_price}
                                        </span>
                                        {product.old_price && (
                                            <span style={{ 
                                                fontSize: "1rem", 
                                                color: "#999", 
                                                textDecoration: "line-through" 
                                            }}>
                                                ₹{product.old_price}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{
                                        display: "flex",
                                        gap: "8px"
                                    }}>
                                        {/* Buy Now Button */}
                                        <button 
                                            onClick={() => {
                                                if (!isAuthenticated) {
                                                    navigate('/login');
                                                } else {
                                                    navigate('/checkout', { state: { product } });
                                                }
                                            }}
                                            style={{
                                                flex: 1,
                                                padding: "12px",
                                                backgroundColor: "#28a745",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontSize: "1rem",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = "#218838";
                                                e.target.style.transform = "translateY(-1px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = "#28a745";
                                                e.target.style.transform = "translateY(0)";
                                            }}>
                                            <FaShoppingBag size={16} />
                                            Buy Now
                                        </button>

                                        {/* Add to Cart Button */}
                                        <button 
                                            onClick={() => {
                                                if (!isAuthenticated) {
                                                    navigate('/login');
                                                } else {
                                                    addToCart(product);
                                                    alert('Product added to cart!');
                                                }
                                            }}
                                            style={{
                                                flex: 1,
                                                padding: "12px",
                                                backgroundColor: "#007bff",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontSize: "1rem",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = "#0056b3";
                                                e.target.style.transform = "translateY(-1px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = "#007bff";
                                                e.target.style.transform = "translateY(0)";
                                            }}>
                                            <FaShoppingCart size={16} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Back to Top Button */}
            <div style={{
                textAlign: "center",
                marginTop: "3rem",
                marginBottom: "2rem"
            }}>
                <button 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                        padding: "12px 24px",
                        backgroundColor: "#333",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                        e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#333";
                        e.target.style.transform = "translateY(0)";
                    }}>
                    ↑ Back to Top
                </button>
            </div>

            {/* Newsletter Section */}
            <div style={{
                backgroundColor: "#f8f9fa",
                padding: "3rem 20px",
                textAlign: "center",
                marginTop: "3rem"
            }}>
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <h2 style={{ 
                        fontSize: "2rem", 
                        marginBottom: "1rem",
                        color: "#333"
                    }}>
                        Stay Updated
                    </h2>
                    <p style={{ 
                        fontSize: "1.1rem", 
                        color: "#666",
                        marginBottom: "2rem"
                    }}>
                        Subscribe to our newsletter for the latest fashion trends and exclusive offers
                    </p>
                    <div style={{
                        display: "flex",
                        gap: "10px",
                        maxWidth: "400px",
                        margin: "0 auto"
                    }}>
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            style={{
                                flex: 1,
                                padding: "12px 16px",
                                border: "2px solid #e9ecef",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                outline: "none"
                            }}
                        />
                        <button style={{
                            padding: "12px 24px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#0056b3";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#007bff";
                        }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;