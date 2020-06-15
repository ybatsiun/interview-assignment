import { postConstants } from '../constants';
import { postsService } from '../services';

export const postsActions = {
    getPosts,
    getImage,
    updatePost,
    deletePost,
    savePost
};

function savePost(post) {
    return async dispatch => {
        const newPost = await postsService.savePost(post);
        return dispatch({ type: postConstants.POST_SAVED, newPost });
    };
}

function getPosts(limit, offset) {
    return async dispatch => {
        const posts = await postsService.getPosts(limit, offset);
        return dispatch({ type: postConstants.POSTS_FETCHED, posts });
    };
};

async function getImage(imgageUrl, sizes) {
    return await postsService.getImage(imgageUrl, sizes);
}

function updatePost(post) {
    return async dispatch => {
        const updatedPost = await postsService.updatePost(post, post.id);
        return dispatch({ type: postConstants.POST_UPDATED, updatedPost });
    };
}

function deletePost(postId) {
    return async dispatch => {
        await postsService.deletePost(postId);
        return dispatch({ type: postConstants.POST_DELETED, postId });
    }
}
