import { useEffect, useState } from 'react';
import CardTutorial from '../components/CardTutorial.jsx';
import { API_URL } from '../config.js';

export default function Notebook() {
  const [tutoriais, setTutoriais] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/tutoriais?categoria=notebook`)
      .then((res) => res.json())
      .then(setTutoriais)
      .catch(() => setErro('Não foi possível carregar os tutoriais. Verifique se o backend está ligado.'));
  }, []);

  // Agrupar tutoriais por grupo
  const grupos = tutoriais.reduce((acc, tutorial) => {
    const grupo = tutorial.grupo || 'Outros';
    if (!acc[grupo]) acc[grupo] = [];
    acc[grupo].push(tutorial);
    return acc;
  }, {});

  return (
    <section>
      <div className="pagina-titulo">
        <h1>💻 Ajuda para Notebook</h1>
        <p>Escolha um assunto para aprender com instruções simples, passo a passo.</p>
      </div>

      {erro && <p className="erro">⚠️ {erro}</p>}

      {Object.entries(grupos).map(([nomeGrupo, itens]) => (
        <div className="grupo-tutoriais" key={nomeGrupo}>
          <h2 className="grupo-titulo">{nomeGrupo}</h2>
          <div className="grade-cards">
            {itens.map((tutorial) => (
              <CardTutorial key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
