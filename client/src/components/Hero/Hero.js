import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";

// import hero svg
import { ReactComponent as HeroImage } from "../../images/hero.svg";

import "./Hero.css";

// import animations
import { container, itemOne, itemTwo } from "../../util/animation";

function Hero() {
    return (
        <div id="hero">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="hero container"
            >
                <motion.div variants={itemOne} className="top">
                    <div className="content">
                        <h1>
                            Organize it all <br /> with Done
                        </h1>
                        <p>
                            Regain clarity and calmness by getting all those{" "}
                            <br />
                            tasks out of your head and onto your to-do list, no{" "}
                            <br />
                            matter where you are or what device you use
                        </p>
                        <div>
                            <Button
                                component={Link}
                                to="/signup"
                                variant="contained"
                                color="primary"
                            >
                                Start now
                            </Button>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={itemTwo} className="bottom">
                    <div className="img-container">
                        <HeroImage />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Hero;
