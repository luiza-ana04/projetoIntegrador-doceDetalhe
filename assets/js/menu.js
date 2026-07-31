// Menu responsivo
export function iniciarMenu() {
  const botao = document.getElementById('menuToggle');
  const menu = document.getElementById('mainNav');
  if (!botao || !menu) return;
  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('open');
    botao.setAttribute('aria-expanded', String(aberto));
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('open');
    botao.setAttribute('aria-expanded', 'false');
  }));
}
