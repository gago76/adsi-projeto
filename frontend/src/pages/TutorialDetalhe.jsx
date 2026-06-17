import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LeitorAudio from '../components/LeitorAudio.jsx';
import { API_URL } from '../config.js';

export default function TutorialDetalhe() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/tutoriais/${id}`)
      .then((res) => res.json())
      .then(setTutorial)
      .catch(() => setMensagem('Não foi possível carregar o tutorial.'));
  }, [id]);

  async function enviarFeedback(event) {
    event.preventDefault();
    if (!feedback.trim()) return;

    await fetch(`${API_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tutorialId: id, mensagem: feedback }),
    });

    setFeedback('');
    setMensagem('Obrigado! Seu feedback foi registrado.');
  }

  if (!tutorial) {
    return <p className="carregando">Carregando tutorial…</p>;
  }

  const textoCompleto = `${tutorial.titulo}. ${tutorial.descricao}. ${tutorial.passos.join('. ')}`;

  return (
    <section>
      <Link to="/notebook" className="voltar">← Voltar aos tutoriais</Link>

      <div className="pagina-titulo">
        <h1>{tutorial.titulo}</h1>
        <p>{tutorial.descricao}</p>
      </div>

      <LeitorAudio texto={textoCompleto} />

      <h2 className="passos-titulo">Passo a passo</h2>
      <div className="passos">
        {tutorial.passos.map((passo, index) => (
          <div className="passo" key={passo}>
            <div className="passo-numero">{index + 1}</div>
            <div className="passo-corpo">
              <strong>Passo {index + 1}</strong>
              <p>{passo}</p>
            </div>
          </div>
        ))}
      </div>

      <form className="feedback" onSubmit={enviarFeedback}>
        <label htmlFor="feedback">Você entendeu esse tutorial?</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Escreva aqui sua dúvida ou sugestão…"
        />
        <button type="submit">Enviar feedback</button>
      </form>

      {mensagem && <p className="sucesso">{mensagem}</p>}
    </section>
  );
}
