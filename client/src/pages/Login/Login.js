import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// import axios
import axios from "axios";

import { ReactComponent as LoginImage } from "../../images/login.svg";

// facebook icon
import FacebookIcon from "@material-ui/icons/Facebook";
import { address } from "../../util/address";
// import styles
import "./Login.css";

import { indigo } from "@material-ui/core/colors";

// import animations
import { container, itemOne, itemTwo } from "../../util/animation";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
    "&:hover": {
      backgroundColor: indigo[700],
    },
  },
}))(Button);

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // set loading
    setLoading(true);

    try {
      const response = await axios.post(
        `http://${address}:4000/api/user/signin`,
        {
          email,
          password,
        },
        {
          headers: {},
        }
      );
      setLoading(false);
      setErrors({});

      // login user and redirect
      props.loginUser(response.data);
      props.history.push("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <div id="login">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        className="login container"
      >
        <motion.div variants={itemOne} className="top">
          <div className="content">
            <h1>Sign in</h1>
            <p>Complete every task</p>
            <ColorButton
              className="google-button"
              variant="contained"
              startIcon={<FacebookIcon />}
              fullWidth
            >
              Sign in with Facebook
            </ColorButton>
            <div className="divider">
              <p>OR</p>
              <div className="line"></div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label htmlFor="">
                  <span className={errors.email && "label-error"}>Email</span>
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </label>
                <input
                  className={errors.email && "input-error"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div className="input">
                <label htmlFor="">
                  <span className={errors.password && "label-error"}>
                    Password
                  </span>
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </label>
                <input
                  className={errors.password && "input-error"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
              <div className="input forgot">
                <p>
                  Forgot password? <Link to="/forgot">Click here</Link>
                </p>
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
              >
                {!loading ? (
                  "Sign in"
                ) : (
                  <React.Fragment>
                    <span style={{ visibility: "hidden" }}>I</span>
                    <CircularProgress color="inherit" size={22} />
                  </React.Fragment>
                )}
              </Button>
            </form>
            <p className="account">
              Doesn't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemTwo} className="bottom">
          <div className="img-container">
            <LoginImage />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
