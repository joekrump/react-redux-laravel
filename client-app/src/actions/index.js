import axios from 'axios';
import jwtdecode from 'jwt-decode';
import {browserHistory} from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  LOGOUT_USER,
  FETCH_POSTS,
  ADD_POST,
  POST_SHOW,
  DELETE_POST,
  EDIT_POST,
  UPDATE_POST,
  FETCH_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  POST_SHOW_SUCCESS,
  UPDATE_POST_SUCCESS,
  USER_INFO_SUCCESS,
  USER_INFO,
  UPDATE_SPOTIFY_PLAYLIST,
  UPDATE_SPOTIFY_PLAYLIST_SUCCESS,
  SPOTIFY_PLAYLIST_INFO,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_ACCESS_TOKEN_SUCCESS
} from './types';

const ROOT_URL = 'http://localhost:8000';


// User and Auth actions
// 
export function loginUser({email,password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/api/login`,{email,password})
    .then(response => {
      dispatch({type: AUTH_USER,
        payload:response.data.token             
      });
      localStorage.setItem('laravel_user_token',response.data.token);
      browserHistory.push("/");
    }).catch(()=>{
      dispatch(authError("Empty Required Field"));
    });
  }
}

export function userInfo(){
  return dispatch => { 
    axios.get(`${ROOT_URL}/api/userinfo`,
    {
      headers:{authorization:`Bearer`+localStorage.getItem('laravel_user_token')}
    }).then(response => {
      dispatch({
        type: USER_INFO_SUCCESS,
        payload: response
      })
    })
  }
}

export function registerUser({email,password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/api/register`,{email,password})
    .then(response =>{
      dispatch({type:AUTH_USER});
      localStorage.setItem('laravel_user_token',response.data.token);
      browserHistory.push('/posts');
    })
    .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error){
  return {
    type:AUTH_ERROR,
    payload:error
  }
}

export function logoutUser() {
  localStorage.removeItem('laravel_user_token');
  
  return { type: LOGOUT_USER };
}


// Post Actions
// 
export function addPost({title,body}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/api/posts`,{title,body},
      {
      headers:{authorization:localStorage.getItem('laravel_user_token')}
    })
    .then(response => {
      dispatch({
        type:ADD_POST,
        payload: response
      })
    })
  }
}

export function fetchPosts(){
  return dispatch => {
    dispatch({
      type: FETCH_POSTS
    });

    axios.get(`${ROOT_URL}/api/posts`,{
     headers: { authorization: localStorage.getItem('laravel_user_token') }
    })
    .then(response => {
          dispatch(fetchPostSuccess(response));
    })
  }
}

export function fetchPostSuccess(posts){
  return {
    type:FETCH_POST_SUCCESS,
    payload:posts
  };
}


export function PostShow(id){
    return dispatch =>{
     dispatch({type:POST_SHOW});
      axios.get(`${ROOT_URL}/api/posts/${id}`,{
       headers: { authorization: localStorage.getItem('laravel_user_token') }
      })
        .then(response =>{
            dispatch(postShowSuccess(response));
        })

    }
}

export function postShowSuccess(post){
  return {
    type:POST_SHOW_SUCCESS,
    payload:post
  };
}

export function EditPost(id){
  return dispatch => {
    dispatch({type:EDIT_POST});  
 
    axios.get(`${ROOT_URL}/api/posts/${id}/edit`,{
     headers: { authorization: localStorage.getItem('laravel_user_token') }
    })
    .then(response =>{
        dispatch(editPostSuccess(response))
    })
  };
}

export function editPostSuccess(posts){
  return {
    type:EDIT_POST_SUCCESS,
    payload:posts  
  };
}

export function updatePost(id,{title,body}){
  return dispatch => {
    dispatch({type:UPDATE_POST});

    axios.put(`${ROOT_URL}/api/posts/${id}`,{title,body},
    {
      headers: { authorization: localStorage.getItem('laravel_user_token') }
    })
    .then(response => {
        dispatch(updatePostSuccess(response));
    })
  };
}
export function updatePostSuccess(post){
  return {
    type:UPDATE_POST_SUCCESS,
    response:post
  }
}

export function deletePost(id){
  return function(dispatch){
    axios.delete(`${ROOT_URL}/api/posts/${id}`,{
     headers: { authorization: localStorage.getItem('laravel_user_token') }
    })
    .then(response =>{
        dispatch({
          type:DELETE_POST,
          payload:response
        });
    })
  }
}


// Spotify Actions
// 
export function spotifyPlayistInfo(){
  return dispatch => { 
    dispatch({
      type: SPOTIFY_PLAYLIST_INFO
    });
  }
}

export function updateSpotifyPlaylist(playlistURI){
  return dispatch => {
    dispatch({
      type: UPDATE_SPOTIFY_PLAYLIST,
      payload: playlistURI
    });
  }
}

export function getSpotifyToken(){
  return dispatch => {

    dispatch({type: SPOTIFY_ACCESS_TOKEN});

    axios.get(`${ROOT_URL}/spotify/access-token`,
    {
      headers:{authorization:`Bearer`+ localStorage.getItem('laravel_user_token')}
    }).then(response => {
      dispatch(getSpotifyTokenSuccess(response))
    })
  }
}

export function getSpotifyTokenSuccess(response){
  return {
    type: SPOTIFY_ACCESS_TOKEN_SUCCESS,
    payload: response
  };
}