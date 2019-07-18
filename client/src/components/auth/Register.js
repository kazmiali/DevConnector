import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// connect is used whenever we have to use redux with react like when we have to use action in the component. And we also have to add it to the export default look below
import { connect } from 'react-redux';
// Whenever you bring an redux action you have to pass it to connect() watch below
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// You can destructure props but I will not
const Register = props => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			props.setAlert('Passwords Do Not Match', 'danger');
		} else {
			props.register({ name, password, email });
			// A SIMPLE USE OF AXIOM TO MAKE A POST REQUEST
			// const newUser = {
			// 	name,
			// 	email,
			// 	password
			// };

			// try {
			// 	const config = {
			// 		headers: {
			// 			'Content-Type': 'application/json'
			// 		}
			// 	};

			// 	const body = JSON.stringify(newUser);

			// 	const res = await axios.post('/api/users', body, config);
			// 	console.log(res.data);
			// } catch (err) {
			// 	console.error(err.response.data);
			// }
		}
	};
	// Redirect if logged In
	if (props.isAuthenticated) {
		// With react router we can do Redirect
		return <Redirect to='/dashboard' />;
	}
	return (
		<div className='center-wrapper'>
			<div className='mr-tb auth-width'>
				<h1 className='large text-primary'>Sign Up</h1>
				<p className='lead'>
					<i className='fas fa-user' /> Create Your Account
				</p>
				<form className='form' onSubmit={e => onSubmit(e)}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Name'
							name='name'
							value={name}
							onChange={e => onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							value={email}
							onChange={e => onChange(e)}
						/>
						<small className='form-text'>
							This site uses Gravatar so if you want a profile image, use a
							Gravatar email
						</small>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={e => onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Confirm Password'
							name='password2'
							minLength='6'
							value={password2}
							onChange={e => onChange(e)}
						/>
					</div>
					<input type='submit' className='btn btn-primary' value='Register' />
				</form>
				<p className='my-1'>
					Already have an account? <Link to='/login'>Sign In</Link>
				</p>
			</div>
		</div>
	);
};

// The propTypes tell the developer that this setAlert which is a func is required for component to work properly
Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

// We have to get auth state from auth reducer init state i.e. Authenticated: true or false, so do this
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

// Connect takes any state you wanna mapToProp which can be some data if there is no data then write it as null and second object with action you wanna do and it will give access to action to the props
export default connect(
	mapStateToProps,
	{ setAlert, register }
)(Register);
