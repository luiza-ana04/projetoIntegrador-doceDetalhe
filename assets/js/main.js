// Arquivo principal: inicializa os módulos da página
import { iniciarMenu } from './menu.js';
import { iniciarCarrossel } from './carousel.js';
import { iniciarNewsletter } from './newsletter.js';
import { iniciarNavegacaoAtiva } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  iniciarMenu();
  iniciarCarrossel();
  iniciarNewsletter();
  iniciarNavegacaoAtiva();
});
