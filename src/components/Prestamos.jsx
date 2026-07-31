import { useState, useEffect } from "react";
import { listarPrestamos, registrarPrestamo, prestamoPorUsuario } from "../services/prestamoService";
import { listarUsuarios } from "../services/usuarioService";
import { listarEjemplares } from "../services/ejemplarService";

function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ejemplares, setEjemplares] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [ejemplarId, setEjemplarId] = useState("");
  const [error, setError] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    await cargarPrestamos();
    cargarUsuarios();
    cargarEjemplares();
  };

  const cargarPrestamos = async () => {
    try {
      const res = await listarPrestamos();
      setPrestamos(res.data);
    } catch (err) {
      setError("No se pudieron cargar los préstamos.");
    }
  };

  const cargarUsuarios = async () => {
    try {
      const res = await listarUsuarios();
      setUsuarios(res.data);
    } catch (err) { /* ignorar */ }
  };

  const cargarEjemplares = async () => {
    try {
      const res = await listarEjemplares();
      setEjemplares(res.data.filter((e) => e.estado === "DISPONIBLE"));
    } catch (err) { /* ignorar */ }
  };

  const registrar = async (e) => {
    e.preventDefault();
    setError("");
    if (!usuarioId || !ejemplarId) {
      setError("Selecciona un usuario y un ejemplar.");
      return;
    }
    try {
      await registrarPrestamo(usuarioId, ejemplarId);
      setUsuarioId("");
      setEjemplarId("");
      await cargarTodo();
    } catch (err) {
      setError("Error: " + (err.response?.data?.message || "no se pudo registrar el préstamo"));
    }
  };

  const filtrar = async (e) => {
    e.preventDefault();
    setError("");
    if (!filtroUsuario) {
      await cargarPrestamos();
      return;
    }
    try {
      const res = await prestamoPorUsuario(filtroUsuario);
      setPrestamos(res.data);
    } catch (err) {
      setError("No se pudieron filtrar los préstamos.");
    }
  };

  const claseEstado = (estado) => {
    if (estado === "ACTIVO") return "badge-verde";
    if (estado === "VENCIDO") return "badge-rojo";
    return "badge-gris";
  };

  return (
    <div className="seccion">
      <h2>Gestión de Préstamos</h2>

      {error && <div className="mensaje-error">{error}</div>}

      <form onSubmit={registrar} className="formulario">
        <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} required>
          <option value="">-- Usuario --</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
          ))}
        </select>
        <select value={ejemplarId} onChange={(e) => setEjemplarId(e.target.value)} required>
          <option value="">-- Ejemplar disponible --</option>
          {ejemplares.map((ej) => (
            <option key={ej.id} value={ej.id}>
              {ej.codigo} {ej.libro ? "- " + ej.libro.titulo : ""}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primario">Registrar préstamo</button>
      </form>

      <form onSubmit={filtrar} className="formulario">
        <select value={filtroUsuario} onChange={(e) => setFiltroUsuario(e.target.value)}>
          <option value="">-- Todos los préstamos --</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
          ))}
        </select>
        <button type="submit" className="btn-secundario">Filtrar</button>
      </form>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Ejemplar</th>
            <th>Préstamo</th>
            <th>Devolución</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.length > 0 ? (
            prestamos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.usuario ? p.usuario.nombre + " " + p.usuario.apellido : "—"}</td>
                <td>{p.ejemplar ? p.ejemplar.codigo : "—"}</td>
                <td>{p.fechaPrestamo}</td>
                <td>{p.fechaDevolucion || "—"}</td>
                <td><span className={claseEstado(p.estadoPrestamo)}>{p.estadoPrestamo}</span></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No hay préstamos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Prestamos;