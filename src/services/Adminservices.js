import api from "./api";

// ================= JYOTIRLINGAS =================

export const getJyotirlingas = () => api.get("/jyotirlingas");

export const getJyotirlingaById = (id) => api.get(`/jyotirlingas/${id}`);

export const createJyotirlinga = (data) => api.post("/jyotirlingas", data);

export const updateJyotirlinga = (id, data) =>
  api.put(`/jyotirlingas/${id}`, data);

export const deleteJyotirlinga = (id) => api.delete(`/jyotirlingas/${id}`);

// ================= GALLERY =================

export const getGallery = () => api.get("/gallery");

export const createGallery = (data) => api.post("/gallery", data);

export const deleteGallery = (id) => api.delete(`/gallery/${id}`);

// ================= BLOG =================

export const getBlogs = () => api.get("/blog");

export const createBlog = (data) => api.post("/blog", data);

export const updateBlog = (id, data) => api.put(`/blog/${id}`, data);

export const deleteBlog = (id) => api.delete(`/blog/${id}`);

// ================= CONTACT =================

export const getContacts = () => api.get("/contacts");

export const deleteContact = (id) => api.delete(`/contacts/${id}`);
