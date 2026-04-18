import api from "./api";

export const getBlogs = () => api.get("/blogs");

export const getMyBlogs = () => api.get("/blogs/my-blogs");

export const getBlogById = (id) => api.get(`/blogs/${id}`);

export const createBlog = (blogData) => api.post("/blogs", blogData);

export const updateBlog = (id, blogData) => api.put(`/blogs/${id}`, blogData);

export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
