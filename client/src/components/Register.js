import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import setAlert from '../actions/alert';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { register } from '../actions/auth';

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section className="container">
      <Alert />
      <h1 className="txt-primary">Sign Up</h1>
      <p className="info">Register as a new user</p>
      <form onSubmit={e => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => onChange(e)}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <p className="my-1">
        Already registered? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
