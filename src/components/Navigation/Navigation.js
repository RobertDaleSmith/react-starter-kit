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
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './Navigation.css';
import Link from '../Link';
import LogoutLink from '../LogoutLink';

class Navigation extends React.Component {
  static defaultProps = {
    auth: {},
  };

  static propTypes = {
    auth: PropTypes.object,
  };

  render() {
    const { auth } = this.props;
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">
          About
        </Link>
        <Link className={s.link} to="/contact">
          Contact
        </Link>
        <span className={s.spacer}> | </span>
        {!auth.user.id && (
          <Link className={s.link} to="/login">
            Login
          </Link>
        )}
        {!auth.user.id && <span className={s.spacer}>or</span>}
        {!auth.user.id && (
          <Link className={cx(s.link, s.highlight)} to="/register">
            Sign up
          </Link>
        )}
        {auth.user.id && (
          <Link className={s.link} to="/profile">
            Profile
          </Link>
        )}
        {auth.user.id && (
          <Link className={s.link} to="/admin">
            Admin
          </Link>
        )}
        {auth.user.id && <LogoutLink className={s.link}>Logout</LogoutLink>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;

  return { auth };
}

export default connect(mapStateToProps)(withStyles(s)(Navigation));
