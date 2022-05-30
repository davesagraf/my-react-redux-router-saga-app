import { takeEvery, all, put } from "redux-saga/effects";
import { SIGNUP, LOGIN, GET_USER_DATA } from "../actions/userAction";
import {
  GET_ALL_POSTS,
  SET_POST,
  DELETE_POST,
  GET_CURRENT_POST,
  EDIT_POST,
  SET_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
  GET_POST_COMMENTS,
  ADD_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
  GET_COMMENT_LIKES,
  GET_FAV_POSTS
} from "../actions/postAction";

const baseUrl = "http://localhost:8000";

export function* signUp() {
  yield takeEvery(SIGNUP, fetchSignUp);
}

const fetchSignUp = async (payload) => {
  const raw = JSON.stringify(payload.userData);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  await fetch(`${baseUrl}/auth/sign_up`, requestOptions).then((response) =>
    response.json()
  );
};

export function* logIn() {
  yield takeEvery(LOGIN, fetchLogIn);
}

const fetchLogIn = async (payload) => {
  const raw = JSON.stringify(payload.userData);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${baseUrl}/auth/sign_in`, requestOptions);
  
  if (response.status === 401) {
    throw new Error(response);
  } else {
    let token = response.headers.get("Authorization")
    localStorage.setItem("Authorization", token);
  }
};

export function* getUser() {
  yield takeEvery(GET_USER_DATA, fetchGetUser);
}

function* fetchGetUser() {
  let bearerToken = localStorage.getItem("Authorization").valueOf();

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `${bearerToken}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const user = yield fetch(`${baseUrl}/user/profile`, requestOptions).then(
      (response) => response.json()
    );

    return yield put({ type: "SUCCESS_GET_USER", payload: user });
  } catch (error) {
    yield put({ type: "ERRORS", payload: error });
  }
}

export function* getPosts() {
  yield takeEvery(GET_ALL_POSTS, postsAsync);
}

function* postsAsync() {
  let bearerToken = localStorage.getItem("Authorization").valueOf();

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `${bearerToken}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const posts = yield fetch(`${baseUrl}/posts/all`, requestOptions)
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });

    posts.reverse();

    return yield put({ type: "SUCCESS", payload: posts });
  } catch (error) {
    yield put({ type: "ERRORS", payload: error });
  }
}

export function* addNewPost() {
  yield takeEvery(SET_POST, fetchAddNewPost);
}

function* fetchAddNewPost(payload) {
  const raw = JSON.stringify(payload.newPost);

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  yield fetch(`${baseUrl}/posts/add`, requestOptions).then((response) =>
    response.json()
  );

  yield put({ type: "GET_ALL_POSTS" });
}

export function* deletePost() {
  yield takeEvery(DELETE_POST, fetchDeletePost);
}

function* fetchDeletePost(payload) {
  const postId = payload.postId;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  yield fetch(`${baseUrl}/posts/post/${postId}`, requestOptions);

  yield put({ type: "GET_ALL_POSTS" });
}

export function* getCurrentPost() {
  yield takeEvery(GET_CURRENT_POST, fetchGetCurrentPost);
}

function* fetchGetCurrentPost(payload) {
  const thisPostId = payload.id;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const currentPost = yield fetch(
    `${baseUrl}/posts/post/${thisPostId}`,
    requestOptions
  ).then((response) => response.json());

  return yield put({ type: "SUCCESS_CURRENT_POST", payload: currentPost });
}

export function* addNewComment() {
  yield takeEvery(SET_COMMENT, fetchAddNewComment);
}

function* fetchAddNewComment(payload) {
  const raw = JSON.stringify(payload.newComment);

  const thisPostId = payload.newComment.post_id;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  yield fetch(`${baseUrl}/comments/add`, requestOptions).then((response) =>
    response.json()
  );

  yield put({ type: "GET_CURRENT_POST", id: thisPostId });
}

export function* deleteComment() {
  yield takeEvery(DELETE_COMMENT, fetchDeleteComment);
}

function* fetchDeleteComment(payload) {
  const commentId = payload.thisCommentId;

  const postId = payload.postId;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  yield fetch(`${baseUrl}/comments/comment/${commentId}`, requestOptions);

  yield put({ type: "GET_CURRENT_POST", id: postId });
}

export function* editPost() {
  yield takeEvery(EDIT_POST, fetchEditPost);
}

function* fetchEditPost(payload) {
  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const editObj = {
    title: payload.updatedPost.title,
    description: payload.updatedPost.description,
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editObj),
    redirect: "follow",
  };

  yield fetch(
    `${baseUrl}/posts/post/${payload.updatedPost.id}`,
    requestOptions
  ).then((response) => response.json());

  yield put({ type: "GET_CURRENT_POST", id: payload.updatedPost.id });
}

export function* editComment() {
  yield takeEvery(EDIT_COMMENT, fetchEditComment);
}

function* fetchEditComment(payload) {
  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const editCom = {
    title: payload.updatedComment.title,
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editCom),
    redirect: "follow",
  };

  yield fetch(
    `${baseUrl}/comments/comment/${payload.updatedComment.id}`,
    requestOptions
  ).then((response) => response.json());

  yield put({ type: "GET_CURRENT_POST", id: payload.updatedComment.post_id });
}

export function* addLikeSaga() {
  yield takeEvery(ADD_LIKE, fetchAddLike);
}

function* fetchAddLike(payload) {
  const postId = payload.postId;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  yield fetch(`${baseUrl}/posts/like/${postId}`, requestOptions).then((response) =>
    response.json()
  );

  yield put({ type: "GET_CURRENT_POST", id: payload.postId });
}

export function* removeLikeSaga() {
  yield takeEvery(REMOVE_LIKE, fetchRemoveLike);
}

function* fetchRemoveLike(payload) {
  const postId = payload.postId;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  yield fetch(`${baseUrl}/posts/unlike/${postId}`, requestOptions).then((response) =>
    response.json()
  );

  yield put({ type: "GET_CURRENT_POST", id: payload.postId });
}

export function* getPostCommentsSaga() {
  yield takeEvery(GET_POST_COMMENTS, fetchGetPostComments);
}

function* fetchGetPostComments(payload) {
  const postId = payload.postId;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `${bearerToken}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const postComments = yield fetch(
      `${baseUrl}/posts/post/comments/${postId}`,
      requestOptions
    ).then((response) => response.json());

    yield put({ type: "SUCCESS_GET_POST_COMMENTS", payload: postComments });
  } catch (error) {
    yield put({ type: "ERRORS", payload: error });
  }
}


export function* getCommentLikesSaga() {
  yield takeEvery(GET_COMMENT_LIKES, fetchGetCommentLikes);
}

function* fetchGetCommentLikes(payload) {
  const commentId = payload.commentId

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `${bearerToken}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const commentLikes = yield fetch(
      `${baseUrl}/comments/comment/likes/${commentId}`,
      requestOptions
    ).then((response) => response.json());

    yield put({ type: "SUCCESS_GET_COMMENT_LIKES", payload: commentLikes });
  } catch (error) {
    yield put({ type: "ERRORS", payload: error });
  }
}

export function* addCommentLikeSaga() {
  yield takeEvery(ADD_COMMENT_LIKE, fetchAddCommentLike);
}

function* fetchAddCommentLike(payload) {
  const commentId = payload.commentId;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  yield fetch(`${baseUrl}/comments/like/${commentId}`, requestOptions).then((response) =>
    response.json()
  );
}

export function* removeCommentLikeSaga() {
  yield takeEvery(REMOVE_COMMENT_LIKE, fetchAddRemoveLike);
}

function* fetchAddRemoveLike(payload) {
  const commentId = payload.commentId;

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  yield fetch(`${baseUrl}/comments/unlike/${commentId}`, requestOptions).then((response) =>
    response.json()
  );
}


export function* getFavPosts() {
  yield takeEvery(GET_FAV_POSTS, fetchGetFavPosts);
}

function* fetchGetFavPosts() {
  let bearerToken = localStorage.getItem("Authorization").valueOf();

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `${bearerToken}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const favPosts = yield fetch(`${baseUrl}/posts/fav`, requestOptions)
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });

    favPosts.reverse();

    return yield put({ type: "SUCCESS_FAV_POSTS", payload: favPosts });
  } catch (error) {
    yield put({ type: "ERRORS", payload: error });
  }
}

export function* rootSaga() {
  yield all([
    signUp(),
    logIn(),
    getUser(),
    getPosts(),
    addNewPost(),
    deletePost(),
    editPost(),
    getCurrentPost(),
    addNewComment(),
    deleteComment(),
    editComment(),
    addLikeSaga(),
    removeLikeSaga(),
    getPostCommentsSaga(),
    getCommentLikesSaga(),
    addCommentLikeSaga(),
    removeCommentLikeSaga(),
    getFavPosts()
  ]);
}
