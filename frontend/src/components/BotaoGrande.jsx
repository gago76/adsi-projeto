import { Link } from 'react-router-dom';

export default function BotaoGrande({ to, children, description, emoji }) {
  return (
    <Link className="botao-grande" to={to}>
      {emoji && <span style={{ fontSize: '2.4rem', lineHeight: 1, marginBottom: 12 }}>{emoji}</span>}
      <strong>{children}</strong>
      {description && <span>{description}</span>}
      <span className="botao-grande-seta">Ver opções →</span>
    </Link>
  );
}
