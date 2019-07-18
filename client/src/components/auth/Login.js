import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// connect is used whenever we have to use redux with react like when we have to use action in the component. And we also have to add it to the export default look below
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Whenever you bring an redux action you have to pass it to connect() watch below
import { login } from '../../actions/auth';

// destructured props.login
const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		login(email, password);
	};

	// Redirect if logged In
	if (isAuthenticated) {
		// With react router we can do Redirect
		return <Redirect to='/dashboard' />;
	}
	return (
		<div className='center-wrapper'>
			<div className='mr-tb auth-width'>
				<h1 className='large text-primary'>Login</h1>
				<p className='lead'>
					<i className='fas fa-user' /> Create Your Account
				</p>
				<form className='form' onSubmit={e => onSubmit(e)}>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							value={email}
							onChange={e => onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							minLength='6'
							value={password}
							onChange={e => onChange(e)}
						/>
					</div>
					<input type='submit' className='btn btn-primary' value='Login' />
				</form>
				<p className='my-1'>
					Don't have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

Login.prototype = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

// We have to get auth state from auth reducer init state i.e. Authenticated: true or false, so do this
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});
// Dont forget to add mapStateToProps to connect when fetching state
export default connect(
	mapStateToProps,
	{ login }
)(Login);
