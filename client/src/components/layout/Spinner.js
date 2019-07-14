// Its gonna load spinner gif
import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
	<Fragment>
		<img
			className='spinner-img'
			src={spinner}
			// style={{
			// 	width: '200px',
			// 	display: 'flex',
			// 	margin: '5rem 0rem 0rem 0rem',

			// 	justifyContent: 'center',
			// 	alignItems: 'center'
			// }}
			alt='Loading...'
		/>
	</Fragment>
);
