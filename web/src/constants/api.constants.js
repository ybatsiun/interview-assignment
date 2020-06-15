import config from '../config';

export const apiConstants = {
    // posts
    getPosts: (limit, offset) => `/posts?limit=${limit}&offset=${offset}`,
    singlePost: id => id ? `/posts/${id}` : `/posts`,

    // images
    getImage: (pictureId, width, height) => `https://picsum.photos/id/${pictureId}/${width}/${height}`,
    uploadFile: `/upload`
}

export const constructUrl = url => `${config.apiUrl}${url}`;