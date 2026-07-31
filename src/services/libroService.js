import api from "./api";

export const listarLibros = () => api.get("/libros");

export const obtenerLibro = (id) => api.get(`/libros/${id}`);

export const crearLibro = (libro)  => api.post("/libros", libro);

export const actualizarLibro = (id,libro) => api.put(`/libros/${id}`, libro);

export const eliminarLibro = (id) => api.delete(`/libros/${id}`);