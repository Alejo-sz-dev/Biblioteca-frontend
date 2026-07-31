import { useState } from "react";
import Usuarios from "./components/Usuarios";
import Libros from "./components/Libros";
import Ejemplares from "./components/Ejemplares";
import Prestamos from "./components/Prestamos";
import "./App.css";

function App() {
  // Guarda qué pestaña está activa. Empieza en "usuarios".
  const [seccionActiva, setSeccionActiva] = useState("usuarios");

  // Segun la pestaña activa, decide qué componente mostrar.
  const renderizarSeccion = () => {
    switch (seccionActiva) {
      case "usuarios":
        return <Usuarios />;
      case "libros":
        return <Libros />;
      case "ejemplares":
        return <Ejemplares />;
      case "prestamos":
        return <Prestamos />;
      default:
        return <Usuarios />;
    }
  };

  // Lista de pestañas (para no repetir codigo)
  const pestanas = [
    { id: "usuarios", label: "Usuarios" },
    { id: "libros", label: "Libros" },
    { id: "ejemplares", label: "Ejemplares" },
    { id: "prestamos", label: "Préstamos" },
  ];

  return (
    <div className="app">
      <header className="encabezado">
        <h1>📚 Biblioteca</h1>
        <p>Sistema de gestión</p>
      </header>

      <nav className="navegacion">
        {pestanas.map((pestana) => (
          <button
            key={pestana.id}
            className={seccionActiva === pestana.id ? "tab tab-activa" : "tab"}
            onClick={() => setSeccionActiva(pestana.id)}
          >
            {pestana.label}
          </button>
        ))}
      </nav>

      <main className="contenido">{renderizarSeccion()}</main>
    </div>
  );
}

export default App;