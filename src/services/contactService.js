import api from "./api";
export const sendContact = (contactData) => api.post("/contact", contactData);
export const getContacts = () => api.get("/contact");
export const deleteContact = (id) => api.delete(`/contact/${id}`);
