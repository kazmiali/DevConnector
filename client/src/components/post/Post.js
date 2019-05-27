import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to='/posts' className='btn btn-light'>
				Back to Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map(comment => (
					<CommentItem key={comment._id} comment={comment} postId={postId} />
				))}
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
