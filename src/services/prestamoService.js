import api from "./api";

export const listarPrestamos = () => api.get("/pretamos");

export const registrarPrestamo = (usuarioId, ejemplarId) =>
    api.post("/prestamos", null, {params: {usuarioId, ejemplarId}});

export const prestamoPorUsuario = (usuarioId) =>
    api.get(`/prestamos/usuario/${usuarioIdid}`);

export const prestamoPorLibro = (libroId) => 
    api.get(`/prestamos/libro/${libroId}`);