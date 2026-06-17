import { Link } from 'react-router-dom';

const icones = {
  'ligar-desligar-notebook': '🔌',
  'usar-mouse-teclado':      '🖱️',
  'aumentar-fonte-tela':     '🔍',
  'volume-som':              '🔊',
  'conectar-wifi':           '📶',
  'acessar-internet':        '🌐',
  'youtube-videos':          '▶️',
  'enviar-email':            '✉️',
  'whatsapp-web':            '💬',
  'videochamada':            '📹',
  'salvar-arquivos':         '💾',
  'abrir-pdf':               '📄',
  'tirar-foto-tela':         '📸',
  'gov-br':                  '🏛️',
  'seguranca-golpes':        '🛡️',
  'senha-segura':            '🔐',
};

export default function CardTutorial({ tutorial }) {
  return (
    <Link className="card" to={`/tutorial/${tutorial.id}`}>
      <div className="card-icone">{icones[tutorial.id] || '📖'}</div>
      <h3>{tutorial.titulo}</h3>
      <p>{tutorial.descricao}</p>
      <span className="card-link-texto">Abrir tutorial →</span>
    </Link>
  );
}
