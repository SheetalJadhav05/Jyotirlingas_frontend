import api from "./api";

export const getGallery = () => api.get("/gallery");
export const createGallery = (data) => api.post("/gallery", data);
export const deleteGallery = (id) => api.delete(`/gallery/${id}`);
export const updateGallery = (id, data) => api.put(`/gallery/${id}`, data);
