import api from "./api";

export const listarUsuarios = () => api.get("/usuarios");

export const obtenerUsuario = (id) => api.get(`/usuarios/${id}`);

export const crearUsuario = (usuario) => api.post("/usuarios", usuario);

export const actualizarUsuario = (id, usuario) => api.put(`/usuarios/${id}`, usuario);

export const eliminarUsuario = (id) => api.delete(`/usuarios/${id}`);