import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const { logout } = require('../../actions/auth');

//In react we dont have to use href we use links
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to='/profiles'>
					<i className='fa fa-users hide-sm' /> <span> Developers</span>
				</Link>
			</li>
			<li>
				<Link to='/posts'>
					<i className='far fa-comment-alt hide-sm' />
					<span> Posts</span>
				</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-laptop-code hide-sm' /> <span>Dashboard</span>
				</Link>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					<i className='fas fa-sign-out-alt' />{' '}
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);
	return (
		<nav className='navbar bg-dark'>
			<h1 className='main-title'>
				<Link to='/'>
					<i className='fas fa-code' /> DevHub
				</Link>
			</h1>
			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logout }
)(Navbar);
