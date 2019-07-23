/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import s from './Register.css';

class Register extends React.Component {
  static defaultProps = {
    errors: null,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    signup: PropTypes.func.isRequired,
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
      }),
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(
      this.state.username,
      this.state.email,
      this.state.password,
    );
    this.setState({
      username: '',
      email: '',
      password: '',
    });
  }

  render() {
    const { title, errors } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          {errors.map((item, index) => {
            const key = `error-${index}`;
            return (
              <p key={key} className={s.error}>
                {item.message}
              </p>
            );
          })}
          <form method="post" onSubmit={this.handleSubmit}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="username">
                Username:
                <input
                  className={s.input}
                  id="username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="email">
                Email address:
                <input
                  className={s.input}
                  id="email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
                <input
                  className={s.input}
                  id="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.auth.errors,
});

export default connect(
  mapStateToProps,
  { signup },
)(withStyles(s)(Register));
