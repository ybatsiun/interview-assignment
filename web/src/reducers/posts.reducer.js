import { postConstants } from '../constants';

export function posts(state = [], action) {
    switch (action.type) {
        case postConstants.POSTS_FETCHED:
            return [...state, ...action.posts]
        case postConstants.POST_UPDATED:
            return state.map(post => {
                if (post.id !== action.updatedPost.id) {
                    return post;
                } else {
                    return action.updatedPost;
                };
            });
        case postConstants.POST_DELETED:
            return state.filter(post => post.id !== action.postId);
        case postConstants.POST_SAVED:
            return [action.newPost, ...state];
        default:
            return state
    }
};