import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons
import '../../Styles/login.css';
import { useNavigate } from 'react-router-dom';
const SignInSignUp = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="sign-container">
            <div className="sign-header">
                <button onClick={toggleForm} className={isSignIn ? 'active' : ''}>Sign In</button>
                <button onClick={toggleForm} className={!isSignIn ? 'active' : ''}>Sign Up</button>
            </div>

            <div className="form-container">
                {isSignIn ? (
                    <div className="form sign-in-form">
                        <h2>Sign In</h2>
                        <div className="input-container">
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" />
                        </div>
                        <div className="input-container">
                            <label>Password:</label>
                            <div className="password-container">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                />
                                <span
                                    className="eye-icon"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <button className="submit-button" onClick={() => navigate('/')}>Sign In</button>
                    </div>
                ) : (
                    <div className="form sign-up-form">
                        <h2>Sign Up</h2>
                      
                        <div className="input-container">
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" />
                        </div>
                        
                        <div className="input-container">
                            <label>Password:</label>
                            <div className="password-container">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                />
                                <span
                                    className="eye-icon"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <div className="input-container">
                            <label>Confirm Password:</label>
                            <div className="password-container">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                />
                                <span
                                    className="eye-icon"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <button className="submit-button" onClick={() => navigate('/')}>Sign Up</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignInSignUp;
