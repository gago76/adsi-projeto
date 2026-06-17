import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../config.js';

const opcoes = [
  { numero: '1', texto: 'Aprender a mandar mensagem' },
  { numero: '2', texto: 'Aprender a enviar foto' },
  { numero: '3', texto: 'Aprender a fazer chamada de vídeo' },
  { numero: '4', texto: 'Aprender a ouvir áudio' },
  { numero: '5', texto: 'Aprender sobre golpes e segurança' },
];

export default function Celular() {
  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <section>
      <div className="pagina-titulo">
        <h1>📱 Ajuda para Celular</h1>
        <p>
          O ADSI atende pelo WhatsApp — uma ferramenta que muita gente já
          conhece e usa no dia a dia.
        </p>
      </div>

      <div className="painel-whatsapp">
        <h2>Como funciona o atendimento?</h2>
        <p>Ao abrir o WhatsApp, você poderá escolher o que precisa aprender:</p>
        <ul>
          {opcoes.map((o) => (
            <li key={o.numero} data-numero={o.numero}>
              {o.texto}
            </li>
          ))}
        </ul>

        <a className="botao-whatsapp" href={linkWhatsApp} target="_blank" rel="noreferrer">
          💬 Abrir atendimento no WhatsApp
        </a>
      </div>
    </section>
  );
}
