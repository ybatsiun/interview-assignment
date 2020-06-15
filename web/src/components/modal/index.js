import { connect } from 'react-redux';
import Modal from './Modal';

const mapStateToProps = state => {
    return {
        getPostByIndex: index => state.posts[index],
        postsLength: state.posts.length
    };
}

export default connect(mapStateToProps)(Modal);