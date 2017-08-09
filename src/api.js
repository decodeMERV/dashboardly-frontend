import superagent from 'superagent'
import { API_HOST } from './config'

class Api {

  requestLogin = (email, password) => (
    superagent
    .post(`${API_HOST}/auth/sessions`)
    .send({ email, password })
  )

  requestLogout = (token) => (
    superagent
    .delete(`${API_HOST}/auth/sessions`)
    .set('Authorization', `token ${token}`)
  )

  getBoardsList = (page, count) => (
    superagent
    .get(`${API_HOST}/boards`)
  )

  getBoard = (id) => (
    superagent
    .get(`${API_HOST}/boards/${id}`)
  )

  getBookmarks = (boardId) => (
    superagent
    .get(`${API_HOST}/boards/${boardId}/bookmarks`)
  )

  getProfilePic = () =>(
    superagent
    .get(`${API_HOST}/auth/me`)

  )



  getCurrentUser = () => (
    superagent
      .get(`${API_HOST}/auth/me`)
  )

  editBoard = (id, title, description) => {
     return superagent
      .patch(`${API_HOST}/boards/${id}`)
      .send({title, description})
  }

  editBookmark = (id, title, url, description) => {
    return superagent
      .patch(`${API_HOST}/bookmarks/${id}`)
      .send({title, url, description})
  }


}

export default new Api();
