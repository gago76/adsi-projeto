import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="app">
      <header className="topo">
        <Link to="/" className="logo">ADSI</Link>
        <span>Assistente Digital Simplificado</span>
      </header>
      <main className="conteudo">
        <Outlet />
      </main>
      <footer className="rodape">
        Projeto Integrador 2026 — Inclusão Digital
      </footer>
    </div>
  );
}
