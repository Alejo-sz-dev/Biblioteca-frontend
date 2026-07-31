import api from "./api";

export const listarEjemplares = () => api.get("/ejemplares");

export const crearEjemplar = (libroId, ejemplar) =>
    api.post(`/ejemplares/libro/${libroId}`, ejemplar);

export const eliminarEjemplar = (id) => api.delete(`/ejemplares/${id}`);

export const disponiblesPorIsbn = (isbn) =>
    api.get(`/ejemplares/disponibles`, {params: {isbn}} );
