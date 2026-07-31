// Carrossel da seção de encomendas e blog
export function iniciarCarrossel() {
  const slides = [...document.querySelectorAll('.carousel-slide')];
  const pontos = [...document.querySelectorAll('.dot')];
  const anterior = document.getElementById('previousSlide');
  const proximo = document.getElementById('nextSlide');
  if (!slides.length || !anterior || !proximo) return;
  let atual = 0;
  let temporizador;
  const exibir = (indice) => {
    atual = (indice + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === atual));
    pontos.forEach((ponto, i) => ponto.classList.toggle('active', i === atual));
  };
  const reiniciar = () => {
    window.clearInterval(temporizador);
    temporizador = window.setInterval(() => exibir(atual + 1), 7000);
  };
  anterior.addEventListener('click', () => { exibir(atual - 1); reiniciar(); });
  proximo.addEventListener('click', () => { exibir(atual + 1); reiniciar(); });
  pontos.forEach((ponto) => ponto.addEventListener('click', () => {
    exibir(Number(ponto.dataset.slideTarget));
    reiniciar();
  }));
  exibir(0);
  reiniciar();
}
