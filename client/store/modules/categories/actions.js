import Vue from 'vue'
import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from './mutation-types'

export function fetchCategories ({ commit }) {
  return Vue.http.get('categories/')
    .then((response) => commit(FETCH_CATEGORIES, response.body))
}
export function createCategory ({ commit, state }, {category}) {
  return Vue.http.post('categories/', category)
    .then((response) => {
      commit(CREATE_CATEGORY, response.body)
    },
    (error, state) => {
      console.log(error.body.business)
    })
}
export function updateCategory ({ commit, state }, { category }) {
  return Vue.http.put(`categories/${category.id}/`, category)
  .then((response) => {
    commit(UPDATE_CATEGORY, response.body)
  },
    (error) => {
      if (error.status === 403) {
        return state.messages.push({
          title: 'Oh Snap!',
          message: 'Sorry you need to log in again',
          type: 'danger',
          duration: 5000

        })
      }
      if (error.status === 500) {
        return state.messages.push({
          title: 'Oh Snap!',
          message: 'There seems to be an error please try again',
          type: 'danger',
          duration: 5000

        })
      }
      return state.messages.push({
        title: 'Oh Snap!',
        message: 'Server is offline.Please try again in a moment',
        type: 'danger',
        duration: 5000
      })
    })
}
export function deleteCategory ({ commit }, {
  id, token
}) {
  return Vue.http.delete(`categories/${id}/`)
    .then((response) => commit(DELETE_CATEGORY, id))
}

export function saveCategory ({ commit, state }, { category }) {
  const index = state.categories.findIndex((c) => c.id === category.id)
  if (index !== -1) {
    return updateCategory({ commit }, { category })
  } else {
    return createCategory({ commit }, { category })
  }
}
