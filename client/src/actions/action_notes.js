import axios from 'axios';

import * as types from './constant_types';

// API URL
const API_URL = 'https://young-river-61354.herokuapp.com';

// API calls for fetching,updating,creating,deleting notes
// fetch multiple note
export function getNotes(start_id,limit,order) {
  const url = `${API_URL}/note?start=${start_id}&limit=${limit}&order=${order}`;
  return function(dispatch) {
    axios({
      url,
      method: 'GET',
    })
      .then(function (response) {
        dispatch({ type: types.FETCH_NOTES, payload: response.data });
      })
      .catch( error => { console.warn(error);});
  };
}

// fetch one note
export function getNote(id) {
  const url = `${API_URL}/note/${id}`;
  return function(dispatch) {
    axios({
      url,
      method: 'GET',
    })
      .then(function (response) {
        dispatch({ type: types.FETCH_NOTE, payload: response.data });
      })
      .catch( error => { console.warn(error);});
  };
}

// create a new note
export function createNote(data,callback, err) {
  const url = `${API_URL}/note/add`;
  return function(dispatch) {
    axios({
      url,
      method: 'POST',
      data: JSON.stringify(data)
    })
      .then(function (response) {
        dispatch({ type: types.CREATE_NOTE, payload: response.data });
        callback();
      })
      .catch( error => { 
        dispatch({ type: types.ERROR_NOTE, payload: error.response.data.error });
        err();
      });
  };
}

// update a note with a given id
export function updateNote(id,data,callback, err) {
  const url = `${API_URL}/note/${id}`;
  return function(dispatch) {
    axios({
      url,
      method: 'PUT',
      data: JSON.stringify(data)
    })
      .then(function (response) {
        dispatch({ type: types.UPDATE_NOTE, payload: response.data });
        callback();
      })
      .catch( error => { 
        dispatch({ type: types.ERROR_NOTE, payload: error.response.data.error });
        err();
      });
  };
}

// delete a note with a given id
export function deleteNote(id,callback) {
  const url = `${API_URL}/note/${id}`;
  return function(dispatch) {
    axios({
      url,
      method: 'DELETE'
    })
      .then(function (response) {
        dispatch({ type: types.DELETE_NOTE, payload: response.data });
        callback();
      })
      .catch( error => { console.warn(error);});
  };
}

// return everything to default
export function resetNote() {
  return {
    type: types.RESET_NOTE
  };
}