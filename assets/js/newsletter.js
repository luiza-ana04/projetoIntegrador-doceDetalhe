// Validação demonstrativa da newsletter
export function iniciarNewsletter() {
  const formulario = document.getElementById('newsletterForm');
  const email = document.getElementById('newsletterEmail');
  const mensagem = document.getElementById('newsletterMessage');
  if (!formulario || !email || !mensagem) return;
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    mensagem.textContent = 'E-mail cadastrado com sucesso!';
    formulario.reset();
  });
}
