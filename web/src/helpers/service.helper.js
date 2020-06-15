import { apiConstants } from "../constants";


export const serviceHelper = {
    handleResponse,
    handleImageResponse,
    getRequestOptions,
    getAdjustedImageUrl
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.errors && data.errors.name && data.errors.name.length !== 0
                && data.errors.name.toString()) || data.message || data.msg || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
};

function handleImageResponse(response) {
    return response.blob().then(image => {
        if (!response.ok) {
            return Promise.reject('Error fetching image');
        };
        let outside = URL.createObjectURL(image)
        return outside;
    })
};

function getRequestOptions(method, body, headers = {}) {
    const requestOptions = {
        method,
        headers: { 'Content-Type': 'application/json', ...headers }
    };
    return body
        ? { ...requestOptions, body: JSON.stringify(body) }
        : requestOptions;
}

function getAdjustedImageUrl(imageUrl, sizes) {
    const idRegExp = /\/id\/\d+/;
    const digitRegExp = /\d+/;
    const idFromUrl = imageUrl.match(idRegExp);
    if (idFromUrl[0]) {
        let imageId = idFromUrl[0].match(digitRegExp);
        return apiConstants.getImage(imageId[0], sizes.width, sizes.height);
    } else {
        return imageUrl;
    };
}