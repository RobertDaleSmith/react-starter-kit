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
import { login } from '../../actions/auth';
import s from './Login.css';

class Login extends React.Component {
  static defaultProps = {
    errors: [],
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    errors: PropTypes.arrayOf(
      PropTypes.shape({ message: PropTypes.string.isRequired }),
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: '',
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
    this.props.login(this.state.usernameOrEmail, this.state.password);
    this.setState({
      usernameOrEmail: '',
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
              <label className={s.label} htmlFor="usernameOrEmail">
                Username or email address:
                <input
                  className={s.input}
                  id="usernameOrEmail"
                  type="text"
                  name="usernameOrEmail"
                  value={this.state.usernameOrEmail}
                  onChange={this.handleChange}
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
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
                Log in
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
  { login },
)(withStyles(s)(Login));
