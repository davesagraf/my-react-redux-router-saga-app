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
} from "../actions/postAction";

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

  await fetch(
    "https://test-api-post.herokuapp.com/auth/sign_up",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export function* logIn() {
  yield takeEvery(LOGIN, fetchLogIn);
}

const fetchLogIn = async (payload) => {
  const raw = JSON.stringify(payload.userData);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer",
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  await fetch(
    "https://test-api-post.herokuapp.com/auth/sign_in",
    requestOptions
  )
    .then((response) => {
      if (response.status === 401) {
        throw new Error(response);
      }
      return response.headers.get("Authorization");
    })
    .then((result) => {
      localStorage.setItem("Authorization", result.slice(7));
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export function* getUser() {
  yield takeEvery(GET_USER_DATA, fetchGetUser);
}

function* fetchGetUser () {

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  yield put({ type: "LOADING" });

  try{
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const user = yield fetch("https://test-api-post.herokuapp.com/user/profile", requestOptions)
    .then((response) => response.json())

    return yield put({ type: "SUCCESS_GET_USER", payload: user });
  } catch (error) {
    yield put({ type: "ERRORS", payload: error });
  }

};

export function* getPosts() {
  yield takeEvery(GET_ALL_POSTS, postsAsync);
}

function* postsAsync() {
  let bearerToken = localStorage.getItem("Authorization").valueOf();

  yield put({ type: "LOADING" });

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const posts = yield fetch(
      "https://test-api-post.herokuapp.com/posts/all",
      requestOptions
    )
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
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  yield fetch(
    "https://test-api-post.herokuapp.com/posts/add",
    requestOptions
  ).then((response) => response.json());

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
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  yield fetch(
    `https://test-api-post.herokuapp.com/posts/post/${postId}`,
    requestOptions
  ).then((response) => response.json());

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
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const currentPost = yield fetch(
    `https://test-api-post.herokuapp.com/posts/post/${thisPostId}`,
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
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  yield fetch(
    "https://test-api-post.herokuapp.com/comments/add",
    requestOptions
  ).then((response) => response.json())
  .then((result) => console.log(result))

  // const getRequestOptions = {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${bearerToken}`,
  //     "Content-Type": "application/json",
  //   },
  //   redirect: "follow",
  // };

  yield put({ type: "GET_CURRENT_POST", id: thisPostId })
}

export function* deleteComment() {
  yield takeEvery(DELETE_COMMENT, fetchDeleteComment);
}

function* fetchDeleteComment (payload) {

  const thisPostId = payload.postId
  
  const commentId = payload.thisCommentId

  let bearerToken = localStorage.getItem("Authorization").valueOf();

  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  yield fetch(
    `https://test-api-post.herokuapp.com/comments/comment/${commentId}`,
    requestOptions
  ).then((response) => response.json())
  .then((result) => console.log(result))

  yield put({ type: "GET_CURRENT_POST", id: thisPostId })
}

export function* editPost() {
  yield takeEvery(EDIT_POST, fetchEditPost);
}

function* fetchEditPost(payload) {

  let bearerToken = localStorage.getItem("Authorization").valueOf();

    const editObj = {
      title: payload.updatedPost.title,
      description: payload.updatedPost.description
    }

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editObj),
    redirect: "follow",
  };

  yield fetch(
    `https://test-api-post.herokuapp.com/posts/post/${payload.updatedPost.id}`,
    requestOptions
  ).then((response) => response.json())

  yield put({ type: "GET_CURRENT_POST", id: payload.updatedPost.id })
}

///

export function* editComment() {
  yield takeEvery(EDIT_COMMENT,fetchEditComment);
}

function* fetchEditComment(payload) {

  let bearerToken = localStorage.getItem("Authorization").valueOf();

    const editCom = {
      title: payload.updatedComment.title
    }

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editCom),
    redirect: "follow",
  };

  yield fetch(
    `https://test-api-post.herokuapp.com/comments/comment/${payload.updatedComment.id}`,
    requestOptions
  ).then((response) => response.json())

  yield put({ type: "GET_CURRENT_POST", id: payload.updatedComment.post_id })
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
    editComment()
  ]);
}
