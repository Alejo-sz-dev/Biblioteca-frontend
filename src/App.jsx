import { useState } from "react";
import Usuarios from "./components/Usuarios";
import Libros from "./components/Libros";
import Ejemplares from "./components/Ejemplares";
import Prestamos from "./components/Prestamos";
import "./App.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState("usuarios");

  const renderizarSeccion = () => {
    switch (seccionActiva) {
      case "usuarios": return <Usuarios />;
      case "libros": return <Libros />;
      case "ejemplares": return <Ejemplares />;
      case "prestamos": return <Prestamos />;
      default: return <Usuarios />;
    }
  };

  const pestanas = [
    { id: "usuarios", label: "Usuarios" },
    { id: "libros", label: "Libros" },
    { id: "ejemplares", label: "Ejemplares" },
    { id: "prestamos", label: "Préstamos" },
  ];

  return (
    <div className="app">
      <header className="encabezado">
        <div className="marca">
          {/* Logo SVG de libro */}
          <svg className="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4.5C4 3.67 4.67 3 5.5 3H18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5.5A1.5 1.5 0 0 1 4 18.5v-14Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            <path d="M8 3v14" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M4 18.5A1.5 1.5 0 0 1 5.5 17H20" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
          </svg>
          <div className="marca-texto">
            <h1>Biblioteca Central</h1>
            <h3>Sistema de gestión</h3>
          </div>
        </div>

        <nav className="menu">
          {pestanas.map((pestana) => (
            <button
              key={pestana.id}
              className={seccionActiva === pestana.id ? "menu-item menu-activo" : "menu-item"}
              onClick={() => setSeccionActiva(pestana.id)}
            >
              {pestana.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="contenido">{renderizarSeccion()}</main>
    </div>
  );
}

export default App;