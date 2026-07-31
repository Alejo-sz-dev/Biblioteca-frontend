import { useState, useEffect } from "react";
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/usuarioService";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
  });

  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const mostrarExito = (mensaje) => {
    setExito(mensaje);
    setTimeout(() => setExito(""), 3000);
  };

  const cargarUsuarios = async () => {
    try {
      const respuesta = await listarUsuarios();
      setUsuarios(respuesta.data);
    } catch (err) {
      setError("No se pudieron cargar los usuarios");
    }
  };


  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const guardar = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const accion = editandoId ? "actualizado" : "creado";
  
      if (editandoId) {
        await actualizarUsuario(editandoId, formulario);
      } else {
        await crearUsuario(formulario);
      }
  
      limpiarFormulario();
      await cargarUsuarios();
      mostrarExito(`Usuario ${accion} correctamente.`);
    } catch (err) {
      setError("Error al guardar. Revisa que el email no esté repetido.");
    }
  };

  const editar = (usuario) => {
    setEditandoId(usuario.id);
    setFormulario({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      fechaNacimiento: usuario.fechaNacimiento || "",
    });
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      return;
    }

    try {
      await eliminarUsuario(id);
      await cargarUsuarios();
      mostrarExito("Usuario eliminado correctamente.");
    } catch (err) {
      setError("No se pudo eliminar el usuario");
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      apellido: "",
      email: "",
      fechaNacimiento: "",
    });
    setEditandoId(null);
  };

  return (
    <div className="seccion">
      <h2>Gestión de Usuarios</h2>

      {error && <div className="mensaje-error">{error}</div>}
      {exito && <div className="toast-exito">{exito}</div>}

      {/* FORMULARIO */}
      <form onSubmit={guardar} className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formulario.apellido}
          onChange={manejarCambio}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formulario.email}
          onChange={manejarCambio}
          required
        />

        <input
          type="date"
          name="fechaNacimiento"
          value={formulario.fechaNacimiento}
          onChange={manejarCambio}
        />

        <button type="submit" className="btn-primario">
          {editandoId ? "Actualizar" : "Crear"}
        </button>

        {editandoId && (
          <button
            type="button"
            onClick={limpiarFormulario}
            className="btn-secundario"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* TABLA */}
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Fecha de nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.fechaNacimiento || "—"}</td>
                <td className="acciones">
                  <button
                    onClick={() => editar(usuario)}
                    className="btn-editar"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => eliminar(usuario.id)}
                    className="btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;