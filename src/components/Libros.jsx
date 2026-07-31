import { useState, useEffect } from "react";
import {
  listarLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} from "../services/libroService";

function Libros() {
  const [libros, setLibros] = useState([]);
  const [formulario, setFormulario] = useState({
    titulo: "",
    isbn: "",
    edicion: "",
    fechaPublicacion: "",
    autor: "",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  useEffect(() => {
    cargarLibros();
  }, []);
  const mostrarExito = (mensaje) => {
    setExito(mensaje);
    setTimeout(() => setExito(""), 3000);
  };

  const cargarLibros = async () => {
    try {
      const respuesta = await listarLibros();
      setLibros(respuesta.data);
    } catch (err) {
      setError("No se pudieron cargar los libros.");
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const guardar = async (e) => {
    e.preventDefault();
    setError("");
  
    const datos = {
      ...formulario,
      fechaPublicacion: formulario.fechaPublicacion || null,
    };
  
    try {
      const accion = editandoId ? "actualizado" : "creado";
  
      if (editandoId) {
        await actualizarLibro(editandoId, datos);
      } else {
        await crearLibro(datos);
      }
  
      limpiarFormulario();
      await cargarLibros();
      mostrarExito(`Libro ${accion} correctamente.`);
    } catch (err) {
      setError(
        "Error al guardar: " +
          (err.response?.data?.message || "revisa los datos (¿ISBN repetido?)")
      );
    }
  };
  const editar = (libro) => {
    setEditandoId(libro.id);
    setFormulario({
      titulo: libro.titulo,
      isbn: libro.isbn,
      edicion: libro.edicion || "",
      fechaPublicacion: libro.fechaPublicacion || "",
      autor: libro.autor,
    });
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este libro?")) return;
    try {
      await eliminarLibro(id);
      await cargarLibros();
      mostrarExito("Libro eliminado correctamente.");
    } catch (err) {
      setError("No se pudo eliminar el libro.");
    }
  };

  const limpiarFormulario = () => {
    setFormulario({ titulo: "", isbn: "", edicion: "", fechaPublicacion: "", autor: "" });
    setEditandoId(null);
  };

  return (
    <div className="seccion">
      <h2>Gestión de Libros</h2>

      {error && <div className="mensaje-error">{error}</div>}
      {exito && <div className="toast-exito">{exito}</div>}

      <form onSubmit={guardar} className="formulario">
        <input type="text" name="titulo" placeholder="Título"
          value={formulario.titulo} onChange={manejarCambio} required />
        <input type="text" name="isbn" placeholder="ISBN"
          value={formulario.isbn} onChange={manejarCambio} required />
        <input type="text" name="edicion" placeholder="Edición"
          value={formulario.edicion} onChange={manejarCambio} />
        <input type="date" name="fechaPublicacion"
          value={formulario.fechaPublicacion} onChange={manejarCambio} />
        <input type="text" name="autor" placeholder="Autor"
          value={formulario.autor} onChange={manejarCambio} required />
        <button type="submit" className="btn-primario">
          {editandoId ? "Actualizar" : "Crear"}
        </button>
        {editandoId && (
          <button type="button" onClick={limpiarFormulario} className="btn-secundario">
            Cancelar
          </button>
        )}
      </form>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>ISBN</th>
            <th>Edición</th>
            <th>Publicación</th>
            <th>Autor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.length > 0 ? (
            libros.map((libro) => (
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.isbn}</td>
                <td>{libro.edicion || "—"}</td>
                <td>{libro.fechaPublicacion || "—"}</td>
                <td>{libro.autor}</td>
                <td className="acciones">
                  <button onClick={() => editar(libro)} className="btn-editar">Editar</button>
                  <button onClick={() => eliminar(libro.id)} className="btn-eliminar">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No hay libros registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Libros;