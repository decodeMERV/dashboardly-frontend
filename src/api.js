import superagent from 'superagent'
import { API_HOST } from './config'

class Api {

  requestLogin = (email, password) => (
    superagent
    .post(`${API_HOST}/auth/sessions`)
    .set('Content-Type', 'application/json')
    .send({ email, password })
  )

  requestLogout = (token) => (
    superagent
    .delete(`${API_HOST}/auth/sessions`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `token ${token}`)
  )

  getBoardsList = (page, count) => (
    superagent
    .get(`${API_HOST}/boards`)
    .set('Content-Type', 'application/json')
  )

  getBoard = (id) => (
    superagent
    .get(`${API_HOST}/boards/${id}`)
  )

  getBookmarks = (boardId) => (
    superagent
    .get(`${API_HOST}/boards/${boardId}/bookmarks`)
    .set('Content-Type', 'application/json')
  )

  getProfilePic = () =>( //TODO: delete this to and use getCurrentUser()
    superagent
    .get(`${API_HOST}/auth/me`)

  )

  getCurrentUser = (token) => (
    superagent
      .get(`${API_HOST}/auth/me`)
      .set('Authorization', `token ${token}`)
  )

  editBoard = (id, title, description, token) => {
     return superagent
      .patch(`${API_HOST}/boards/${id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `token ${token}`)
      .send({title, description})
  }

  editBookmark = (id, title, url, description, token) => {
    return superagent
      .patch(`${API_HOST}/bookmarks/${id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `token ${token}`)
      .send({title, url, description})
  }


  createBoard = (title, description, token) => (
    superagent
      .post(`${API_HOST}/boards`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `token ${token}`)
      .send({ title, description })
  )

  createBookmark = (title, url, description, boardId, token) =>(
    superagent
    .post(`${API_HOST}/boards/${boardId}/bookmarks`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `token ${token}`)
    .send({title, url, description, boardId})
  )

  requestSignUp = (email, password) => (
    superagent
      .post(`${API_HOST}/auth/users`)
      .set('Content-Type', 'application/json')
      .send({email, password})
  )

  deleteBoard = (boardId, token) => (
    superagent
      .delete(`${API_HOST}/boards/${boardId}`)
      .set('Authorization', `token ${token}`)
  )

  deleteBookmark = (bookmarkId, token) => (
    superagent
      .delete(`${API_HOST}/bookmarks/${bookmarkId}`)
      .set('Authorization', `token ${token}`)
  )
}

export default new Api();
