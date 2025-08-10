// src/screens/LoginScreen.js
import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("/api/users/login", {
                email,
                password
            });

            // Use AuthContext to login
            login(response.data, response.data.token);
            
            setSuccess("Login successful! Redirecting...");
            
            // Redirect to home page after successful login
            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.message || 
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px"
        }}>
            <div style={{
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                padding: "3rem",
                width: "100%",
                maxWidth: "450px",
                position: "relative",
                overflow: "hidden"
            }}>
                {/* Background decoration */}
                <div style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    opacity: "0.1"
                }} />
                
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <div style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)"
                    }}>
                        <FaSignInAlt size={40} color="white" />
                    </div>
                    <h1 style={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        color: "#2d3748",
                        margin: "0",
                        fontFamily: "'Poppins', sans-serif"
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        color: "#718096",
                        fontSize: "1.1rem",
                        margin: "0.5rem 0 0 0"
                    }}>
                        Sign in to your account
                    </p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <div style={{
                        backgroundColor: "#fed7d7",
                        color: "#c53030",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        marginBottom: "1.5rem",
                        border: "1px solid #feb2b2",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}>
                        <span>⚠️</span>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{
                        backgroundColor: "#c6f6d5",
                        color: "#22543d",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        marginBottom: "1.5rem",
                        border: "1px solid #9ae6b4",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}>
                        <span>✅</span>
                        {success}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={submitHandler}>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{
                            display: "block",
                            marginBottom: "0.5rem",
                            color: "#4a5568",
                            fontWeight: "600",
                            fontSize: "0.95rem"
                        }}>
                            Email Address
                        </label>
                        <div style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <FaEnvelope style={{
                                position: "absolute",
                                left: "16px",
                                color: "#a0aec0",
                                fontSize: "1.1rem"
                            }} />
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                placeholder="Enter your email"
                                style={{
                                    width: "100%",
                                    padding: "16px 16px 16px 48px",
                                    border: "2px solid #e2e8f0",
                                    borderRadius: "12px",
                                    fontSize: "1rem",
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    backgroundColor: "#f7fafc"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#667eea";
                                    e.target.style.backgroundColor = "white";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#e2e8f0";
                                    e.target.style.backgroundColor = "#f7fafc";
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <label style={{
                            display: "block",
                            marginBottom: "0.5rem",
                            color: "#4a5568",
                            fontWeight: "600",
                            fontSize: "0.95rem"
                        }}>
                            Password
                        </label>
                        <div style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <FaLock style={{
                                position: "absolute",
                                left: "16px",
                                color: "#a0aec0",
                                fontSize: "1.1rem"
                            }} />
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                placeholder="Enter your password"
                                style={{
                                    width: "100%",
                                    padding: "16px 48px 16px 48px",
                                    border: "2px solid #e2e8f0",
                                    borderRadius: "12px",
                                    fontSize: "1rem",
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    backgroundColor: "#f7fafc"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#667eea";
                                    e.target.style.backgroundColor = "white";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#e2e8f0";
                                    e.target.style.backgroundColor = "#f7fafc";
                                }}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: "absolute",
                                    right: "16px",
                                    background: "none",
                                    border: "none",
                                    color: "#a0aec0",
                                    cursor: "pointer",
                                    padding: "4px",
                                    borderRadius: "4px",
                                    transition: "color 0.3s ease"
                                }}
                                onMouseEnter={(e) => e.target.style.color = "#667eea"}
                                onMouseLeave={(e) => e.target.style.color = "#a0aec0"}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "16px",
                            backgroundColor: loading ? "#a0aec0" : "#667eea",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            boxShadow: loading ? "none" : "0 10px 20px rgba(102, 126, 234, 0.3)"
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = "#5a67d8";
                                e.target.style.transform = "translateY(-2px)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = "#667eea";
                                e.target.style.transform = "translateY(0)";
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <div style={{
                                    width: "20px",
                                    height: "20px",
                                    border: "2px solid #ffffff",
                                    borderTop: "2px solid transparent",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite"
                                }} />
                                Signing In...
                            </>
                        ) : (
                            <>
                                <FaSignInAlt size={18} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Links */}
                <div style={{
                    textAlign: "center",
                    marginTop: "2rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #e2e8f0"
                }}>
                    <p style={{
                        color: "#718096",
                        margin: "0 0 1rem 0",
                        fontSize: "1rem"
                    }}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={{
                            color: "#667eea",
                            textDecoration: "none",
                            fontWeight: "600",
                            transition: "color 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.color = "#5a67d8"}
                        onMouseLeave={(e) => e.target.style.color = "#667eea"}>
                            Create one here
                        </Link>
                    </p>
                    
                    <Link to="/" style={{
                        color: "#a0aec0",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#718096"}
                    onMouseLeave={(e) => e.target.style.color = "#a0aec0"}>
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {/* CSS for loading animation */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoginScreen;