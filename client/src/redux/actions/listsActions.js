import axios from 'axios'
import { GET_LISTS, GET_LIST, SET_LIST, ADD_LIST, EDIT_LIST, DELETE_LIST, SHOW_ALL_LISTS } from '@redux/types';

import config from '@/config.json'


export function getLists(userId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/lists/getLists`, {
                params: {
                    'userId': userId
                }
            })
            dispatch({ type: GET_LISTS, payload: response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function setList(listId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/lists/getList`, {
                params: {
                    'listId': listId
                }
            })
            dispatch({ type: SET_LIST, payload: response.data.list })
        } catch (e) {
            console.log(e)
        }
    }
}

export function showAllLists() {
    return async dispatch => {
        try {
            dispatch({ type: SHOW_ALL_LISTS })
        } catch (e) {
            console.log(e)
        }
    }
}

export function addList(userId, title, color) {
    return async dispatch => {
        try {
            const response = await axios.post(config.proxy + `api/lists/addList`, {
                'userId': userId,
                'color': color,
                'title': title
            })
            dispatch({ type: ADD_LIST, payload: response.data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function editList(listId, title,completed) {
    return async dispatch => {
        try {
            const response = await axios.put(config.proxy + `api/lists/editList`, {
                'listId': listId,
                'title': title
            })
            dispatch({ type: EDIT_LIST, payload: response.data.list })
        } catch (e) {
            console.log(e)
        }
    }
}

export function deleteList(listId) {
    return async dispatch => {
        try {
            const response = await axios.put(config.proxy + `api/lists/deleteList`, {
                'listId': listId
            })
            dispatch({ type: DELETE_LIST, payload: response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

