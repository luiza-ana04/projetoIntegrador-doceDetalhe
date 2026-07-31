// Marca o item de navegação correspondente à seção visível
export function iniciarNavegacaoAtiva() {
  const secoes = document.querySelectorAll('main section[id], footer[id]');
  const links = document.querySelectorAll('.main-nav a[href^="#"]');
  if (!secoes.length || !links.length || !('IntersectionObserver' in window)) return;
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((link) => link.classList.remove('active'));
      document.querySelector(`.main-nav a[href="#${entrada.target.id}"]`)?.classList.add('active');
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  secoes.forEach((secao) => observador.observe(secao));
}
