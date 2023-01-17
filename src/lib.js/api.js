export async function getAllPosts() {
    const response = await fetch('/posts');
    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || 'Could not fetch posts');
    }

    const postList = [];

    for(const key in data) {
        const postObj = {
            id: key,
            ...data[key],
        };

        postList.push(postObj);
    }

    return postList;
}

export async function getSinglePost(postId) {
    const response = await fetch(`/posts/${postId}`);
    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || 'Could not fetch post');
    }

    const loadedPost = {
        id: postId,
        ...data,
    };

    return loadedPost;
}

