import Usuarios from "./components/Usuarios";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="encabezado">
        <h1>📚 Biblioteca</h1>
        <p>Sistema de gestión</p>
      </header>

      <main className="contenido">
        <Usuarios />
      </main>
    </div>
  );
}

export default App;