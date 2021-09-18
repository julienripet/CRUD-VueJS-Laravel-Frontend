import { instance } from "./instanceAxios"

export const fetchAllArticles = async () => {
    return await instance.get('articles')
}

export const fetchArticle = async (id) => {
    return await instance.get(`articles/${id}`)
}

export const postArticle = async (article) => {
    return await instance.post(`articles`, article)
}

export const putArticle = async (article) => {
    return await instance.put(`articles`, article)
}

export const deleteArticle = async (id) => {
    return await instance.delete(`articles/${id}`)
}
