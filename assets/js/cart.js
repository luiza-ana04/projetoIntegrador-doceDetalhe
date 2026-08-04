// Gerenciamento da Sacola de Orçamentos
document.addEventListener('DOMContentLoaded', () => {
  // Array para armazenar os produtos adicionados
  let sacola = [];

  // Mapeamento de elementos do DOM
  const cartCountEl = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyMsg = document.getElementById('empty-cart-msg');
  const btnEnviarWhatsApp = document.getElementById('btnEnviarWhatsApp');
  const inputData = document.getElementById('dataEvento');
  const inputObs = document.getElementById('obsEvento');

  // Seleciona todos os cards de produtos no cardápio
  const cardsProdutos = document.querySelectorAll('.produto');

  cardsProdutos.forEach((card) => {
    const btnAdicionar = card.querySelector('button[id="texto"]');
    const inputQtd = card.querySelector('input');
    const btnPlus = card.querySelector('.bi-plus')?.parentElement;
    const btnDash = card.querySelector('.bi-dash')?.parentElement;

    // Controles de quantidade (+ e -) nos cards
    if (btnPlus && inputQtd) {
      btnPlus.onclick = (e) => {
        e.preventDefault();
        inputQtd.value = parseInt(inputQtd.value || 0) + 1;
      };
    }

    if (btnDash && inputQtd) {
      btnDash.onclick = (e) => {
        e.preventDefault();
        if (parseInt(inputQtd.value) > 1) {
          inputQtd.value = parseInt(inputQtd.value) - 1;
        }
      };
    }

    // Clique em "Adicionar"
    if (btnAdicionar) {
      btnAdicionar.addEventListener('click', (e) => {
        e.preventDefault();
        const nomeProduto = card.querySelector('.nome').textContent.trim();
        const quantidade = parseInt(inputQtd ? inputQtd.value : 1);

        adicionarAoCarrinho(nomeProduto, quantidade);
      });
    }
  });

  // Função para adicionar/atualizar item na lista
  function adicionarAoCarrinho(nome, quantidade) {
    const itemExistente = sacola.find((item) => item.nome === nome);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      sacola.push({ nome, quantidade });
    }

    atualizarInterfaceSacola();

    // Notificação visual simples no botão do offcanvas
    const offcanvasEl = document.getElementById('sacolaOrcamento');
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
    bsOffcanvas.show();
  }

  // Função para remover item da sacola
  window.removerDoCarrinho = function (index) {
    sacola.splice(index, 1);
    atualizarInterfaceSacola();
  };

  // Renderização da interface da sacola
  function atualizarInterfaceSacola() {
    // Atualiza contador de badges
    const totalItens = sacola.reduce((acc, item) => acc + item.quantidade, 0);
    cartCountEl.textContent = totalItens;

    // Renderiza a lista
    if (sacola.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-center text-muted my-4" id="empty-cart-msg">Sua sacola está vazia.</p>';
      return;
    }

    cartItemsContainer.innerHTML = '';
    sacola.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div>
          <p class="cart-item-title">${item.nome}</p>
          <span class="cart-item-qty">Qtd: ${item.quantidade}</span>
        </div>
        <button class="btn-remove-item" onclick="removerDoCarrinho(${index})" title="Remover item">
          <i class="bi bi-trash"></i>
        </button>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
  }

  // Integração para envio do pedido no WhatsApp
  if (btnEnviarWhatsApp) {
    btnEnviarWhatsApp.addEventListener('click', () => {
      if (sacola.length === 0) {
        alert('Adicione ao menos um produto à sacola antes de enviar.');
        return;
      }

      const dataEvento = inputData.value;
      if (!dataEvento) {
        alert('Por favor, informe a data prevista do seu evento.');
        inputData.focus();
        return;
      }

      // Formatação da data para o formato BR
      const dataFormatada = dataEvento.split('-').reverse().join('/');
      const observacoes = inputObs.value.trim();

      // Montagem da mensagem estruturada
      let mensagem = `Olá! Gostaria de fazer um orçamento com a *Doce Detalhe Confeitaria*:\n\n`;
      mensagem += `📅 *Data do Evento:* ${dataFormatada}\n`;
      if (observacoes) mensagem += `📝 *Observações:* ${observacoes}\n`;
      mensagem += `\n🍰 *Produtos Solicitados:*\n`;

      sacola.forEach((item) => {
        mensagem += `• ${item.nome} (Qtd: ${item.quantidade})\n`;
      });

      // Telefone configurado no projeto: (41) 98533-7031
      const telefone = '5541985337031';
      const linkWhatsapp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

      // Redireciona para o WhatsApp
      window.open(linkWhatsapp, '_blank');
    });
  }
});