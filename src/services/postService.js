import api from '../api/axios'

export const getPosts = async () => {
  const response = await api.get('/posts?_sort=createdAt&_order=desc')
  return response.data
}

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`)
  return response.data
}

export const createPost = async (postData) => {
  const response = await api.post('/posts', postData)
  return response.data
}

export const updatePost = async (id, postData) => {
  const response = await api.patch(`/posts/${id}`, postData)
  return response.data
}

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`)
  return response.data
}