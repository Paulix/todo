import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";

import { ReactComponent as Logo } from "../../images/logo.svg";

import { motion } from "framer-motion";

// import hamburger lottie animation
import lottie from "lottie-web";
import animationData from "./menu.json";

// style import
import "./Navbar.css";

function Navbar(props) {
    const [active, setActive] = useState(false);
    const [animation, setAnimation] = useState(null);
    const [direction, setDirection] = useState(-1);

    useEffect(() => {
        setAnimation(
            lottie.loadAnimation({
                container: document.querySelector(".hamburger"),
                renderer: "svg",
                loop: false,
                autoplay: false,
                animationData: animationData,
            })
        );
    }, []);

    useEffect(() => {
        if (animation) {
            animation.setDirection(direction);
            animation.play();
        }
    }, [direction]);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={props.user.authenticated ? { y: -100 } : { y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 1 }}
        >
            <nav id="nav">
                <div className="nav container">
                    <div className="logo">
                        <Link to="/">
                            <Logo />
                            <h1>Done</h1>
                        </Link>
                    </div>
                    <div
                        style={{ width: 50, height: 50 }}
                        className={`hamburger ${active ? "active" : ""}`}
                        onClick={() => {
                            setDirection(direction === 1 ? -1 : 1);
                            setActive(!active);
                        }}
                    />
                    <div className={`navigation ${active ? "active" : ""}`}>
                        <ul className="nav-links">
                            <li className="nav-link">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/about">About</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/services">Services</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li className="nav-link link-pink">
                                <Link to="/signin">Sign in</Link>
                            </li>
                            <li className="nav-link link-blue">
                                <Link to="/signup">Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}

const mapStateToProps = (state) => ({
    user: state,
});

export default connect(mapStateToProps)(Navbar);
