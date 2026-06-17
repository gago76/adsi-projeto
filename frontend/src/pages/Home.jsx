import BotaoGrande from '../components/BotaoGrande.jsx';

export default function Home() {
  return (
    <section>
      <div className="hero">
        <span className="hero-badge">🤝 Inclusão Digital</span>
        <h1>
          Tecnologia simples<br />
          <span>para todo mundo</span>
        </h1>
        <p className="hero-sub">
          Aprenda a usar seu notebook ou celular com tutoriais claros,
          passo a passo, sem complicação.
        </p>
      </div>

      <div className="grade-opcoes">
        <BotaoGrande to="/notebook" emoji="💻" description="Tutoriais passo a passo no site">
          Notebook ou Computador
        </BotaoGrande>

        <BotaoGrande to="/celular" emoji="📱" description="Atendimento pelo WhatsApp">
          Celular
        </BotaoGrande>

        <BotaoGrande to="/ambos" emoji="💻📱" description="Escolha onde precisa de ajuda">
          Uso os dois
        </BotaoGrande>
      </div>
    </section>
  );
}
