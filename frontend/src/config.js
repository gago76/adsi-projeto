// Em produção, aponta para o backend no Render
// Em desenvolvimento, aponta para o localhost
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999';
export const WHATSAPP_MESSAGE = encodeURIComponent(
  import.meta.env.VITE_WHATSAPP_MESSAGE || 'Olá! Preciso de ajuda com tecnologia.'
);
