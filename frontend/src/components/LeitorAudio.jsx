import { useState } from 'react';

export default function LeitorAudio({ texto }) {
  const [tocando, setTocando] = useState(false);

  function falar() {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura em voz alta.');
      return;
    }
    if (tocando) {
      window.speechSynthesis.cancel();
      setTocando(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.onend = () => setTocando(false);
    window.speechSynthesis.speak(utterance);
    setTocando(true);
  }

  return (
    <button className="botao-audio" onClick={falar} type="button">
      {tocando ? '⏹ Parar áudio' : '🔊 Ouvir explicação'}
    </button>
  );
}
