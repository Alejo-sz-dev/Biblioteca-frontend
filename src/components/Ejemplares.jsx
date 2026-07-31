import { useState, useEffect } from "react";
import { listarEjempalres, crearEjemplar, eliminarEjemplar, disponiblesPorIsbn } from "../services/ejemplarService";
import { listarLibros } from "../services/libroService";

function Ejemplares() {
    const[ejemplares, setEjemplares] = useState([]);
    const[libros, setLibros] = useState([]);
    const[libroId, setLibroId] = useState("");
    const[codigo, setCodigo] = useState("");
    const[error, setError] = useState("");

    const[isbnBusqueda, setIsbnBusqueda] = useState("");
    const[disponibles, setDisponibles] = useState(null);

    useEffect(() => {
        cargarEjemplares();
        cargarLibros();
    },[]);

    const cargarEjemplares = async () => {
        try{
            const res = await listarEjempalres();
            setEjemplares(res.data);
        }catch (err){
            setError("No se pudieron cargar los ejemplares");
        }
    };

    const cargarLibros = async () => {
      try {
        const res = await listarLibros();
        setLibros(res.data);
      } catch (err) {
        setError("No se pudieron cargar los libros.");
      }
    };

    const guardar = async (e) => {
        e.preventDefault();
        setError("");
        if(!libroId){
            setError("Selecciona un libro");
            return;
        }
        try{
            await crearEjemplar(libroId, {codigo});
            setCodigo("");
            setLibroId("");
            await cargarEjemplares();
        }catch (err){
            setError("Error al crear ejemplar: " + (err.response?.data.message || "revisa los datos"));
        }
    };

    const eliminar = async (id) => {
        if(!window.confirm("¿Seguro que deseas eliminar este ejemplar")) 
            return;
        try{
            await eliminarEjemplar(id);
            await cargarEjemplares();
        }catch (err){
            setError("No se pudo eliminar ejemplar");
        }
    };

    const bucarDisponibles = async (e) => {
        e.preventDefault();
        setError("");
        try{
            const res = await disponiblesPorIsbn(isbnBusqueda);
            setDisponibles(res.data);
        }catch(err){
            setError("No se encontraron ejemplares para ese ISBN");
            setDisponibles([]);
        }
    };

    return (
        <div className="seccion">
          <h2>Gestión de Ejemplares</h2>
    
          {error && <div className="mensaje-error">{error}</div>}
    
          {/* Formulario de creacion */}
          <form onSubmit={guardar} className="formulario">
            <select value={libroId} onChange={(e) => setLibroId(e.target.value)} required>
              <option value="">-- Selecciona un libro --</option>
              {libros.map((libro) => (
                <option key={libro.id} value={libro.id}>
                  {libro.titulo} ({libro.isbn})
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Código del ejemplar"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
            <button type="submit" className="btn-primario">Crear ejemplar</button>
          </form>
    
          {/* Buscador de disponibles por ISBN */}
          <form onSubmit={buscarDisponibles} className="formulario">
            <input
              type="text"
              placeholder="Buscar disponibles por ISBN"
              value={isbnBusqueda}
              onChange={(e) => setIsbnBusqueda(e.target.value)}
              required
            />
            <button type="submit" className="btn-secundario">Buscar disponibles</button>
          </form>
    
          {disponibles !== null && (
            <div className="mensaje-info">
              <strong>{disponibles.length}</strong> ejemplar(es) disponible(s) para ese ISBN.
            </div>
          )}
    
          {/* Tabla de todos los ejemplares */}
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Libro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ejemplares.length > 0 ? (
                ejemplares.map((ej) => (
                  <tr key={ej.id}>
                    <td>{ej.id}</td>
                    <td>{ej.codigo}</td>
                    <td>{ej.libro ? ej.libro.titulo : "—"}</td>
                    <td>
                      <span className={ej.estado === "DISPONIBLE" ? "badge-verde" : "badge-rojo"}>
                        {ej.estado}
                      </span>
                    </td>
                    <td className="acciones">
                      <button onClick={() => eliminar(ej.id)} className="btn-eliminar">Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No hay ejemplares registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    
    export default Ejemplares;
}