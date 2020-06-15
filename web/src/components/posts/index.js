import { connect } from 'react-redux';
import Posts from './Posts';
import { postsActions } from '../../actions'

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: (limit, offset) => dispatch(postsActions.getPosts(limit, offset))
    };
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);