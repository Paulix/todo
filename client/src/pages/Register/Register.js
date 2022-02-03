import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// import axios
import axios from "axios";

// import image
import { ReactComponent as RegisterImage } from "../../images/register.svg";

import "./Register.css";

// import animations
import { container, itemOne, itemTwo } from "../../util/animation";
import { address } from "../../util/address";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // set loading
    setLoading(true);

    // make axios request
    try {
      const response = await axios.post(
        `http://${address}:4000/api/user/signup`,
        {
          username,
          email,
          password,
          confirmPassword,
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
      setErrors(err.response.data);
    }
  };

  return (
    <div id="register">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        className="register container"
      >
        <motion.div variants={itemOne} className="top">
          <div className="content">
            <h1>Sign up</h1>
            <p>Start your journey right now</p>
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label htmlFor="">
                  <span className={errors.username && "label-error"}>
                    Username
                  </span>
                  {errors.username && (
                    <span className="error">{errors.username}</span>
                  )}
                </label>
                <input
                  className={errors.username && "input-error"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
              </div>
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
              <div className="input">
                <label htmlFor="">
                  <span className={errors.confirmPassword && "label-error"}>
                    Confirm password
                  </span>
                  {errors.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                  )}
                </label>
                <input
                  className={errors.confirmPassword && "input-error"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
              </div>
              <div className="input check">
                <Checkbox
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  inputProps={{
                    "aria-label": "primary checkbox",
                  }}
                />
                <p>
                  I agree to the <Link to="/privacy">Privacy Policy</Link>
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
                  "Start now"
                ) : (
                  <React.Fragment>
                    <span style={{ visibility: "hidden" }}>I</span>
                    <CircularProgress color="inherit" size={22} />
                  </React.Fragment>
                )}
              </Button>
            </form>
            <p className="account">
              Already have an account? <Link to="/signin">Sign in</Link>
            </p>
          </div>
        </motion.div>
        <motion.div variants={itemTwo} className="bottom">
          <div className="img-container">
            <RegisterImage />
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

export default connect(mapStateToProps, mapActionsToProps)(Register);
