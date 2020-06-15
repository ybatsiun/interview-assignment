import { serviceHelper } from '../helpers';
import { apiConstants } from '../constants';
import { constructUrl } from '../constants/api.constants';
export const postsService = {
    getPosts,
    getImage,
    updatePost,
    deletePost,
    uploadFile,
    savePost
};

function savePost(post) {
    return fetch(
        constructUrl(apiConstants.singlePost()),
        serviceHelper.getRequestOptions('POST', post))
        .then(serviceHelper.handleResponse)
}

function uploadFile(file) {
    const data = new FormData();
    data.append('file', file);
    return fetch(
        constructUrl(apiConstants.uploadFile),
        { method: 'POST', body: data })
        .then(serviceHelper.handleResponse);
}

function getPosts(limit = 0, offset = 0) {
    return fetch(
        constructUrl(apiConstants.getPosts(limit, offset)),
        serviceHelper.getRequestOptions('GET'))
        .then(serviceHelper.handleResponse)
};

function getImage(imageUrl, sizes) {
    if (sizes.width || sizes.height) {
        imageUrl = serviceHelper.getAdjustedImageUrl(imageUrl, sizes)
    };
    return fetch(
        imageUrl,
        serviceHelper.getRequestOptions('GET'))
        .then(serviceHelper.handleImageResponse)
};

function updatePost(post, postId) {
    return fetch(
        constructUrl(apiConstants.singlePost(postId)),
        serviceHelper.getRequestOptions('PUT', post))
        .then(serviceHelper.handleResponse)
};

function deletePost(postId) {
    return fetch(
        constructUrl(apiConstants.singlePost(postId)),
        serviceHelper.getRequestOptions('DELETE'))
        .then(serviceHelper.handleResponse)
}