// Its gonna load spinner gif
import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
	<div className='spinner-wrapper'>
		<img className='spinner-img' src={spinner} alt='Loading...' />
	</div>
);
