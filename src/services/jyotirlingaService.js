import api from "./api";

// GET ALL
export const getJyotirlingas = () => api.get("/jyotirlingas");

// GET SINGLE
export const getJyotirlingaById = (id) => api.get(`/jyotirlingas/${id}`);

// CREATE (FORM DATA + IMAGE)
export const createJyotirlinga = (formData) =>
  api.post("/jyotirlingas", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// UPDATE (FORM DATA + IMAGE)
export const updateJyotirlinga = (id, formData) =>
  api.put(`/jyotirlingas/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// DELETE
export const deleteJyotirlinga = (id) => api.delete(`/jyotirlingas/${id}`);
