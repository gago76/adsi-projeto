import BotaoGrande from '../components/BotaoGrande.jsx';

export default function Ambos() {
  return (
    <section>
      <div className="pagina-titulo">
        <h1>💻📱 Você usa os dois</h1>
        <p>Escolha onde precisa de ajuda agora.</p>
      </div>

      <div className="grade-opcoes">
        <BotaoGrande to="/notebook" emoji="💻" description="Tutoriais passo a passo no site">
          Ajuda com Notebook
        </BotaoGrande>

        <BotaoGrande to="/celular" emoji="📱" description="Atendimento pelo WhatsApp">
          Ajuda com Celular
        </BotaoGrande>
      </div>
    </section>
  );
}
