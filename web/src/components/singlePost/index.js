import { connect } from 'react-redux';
import SinglePost from './SinglePost';
import { postsActions } from '../../actions';
import { postsService } from '../../services';

const mapDispatchToProps = dispatch => {
    return {
        updatePost: post => dispatch(postsActions.updatePost(post)),
        deletePost: postId => dispatch(postsActions.deletePost(postId)),
        uploadFile: file => postsService.uploadFile(file),
        savePost: post => dispatch(postsActions.savePost(post))
    };
};
export default connect(null, mapDispatchToProps)(SinglePost);